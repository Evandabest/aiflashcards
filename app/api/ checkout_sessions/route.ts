import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Event", event?.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_details?.email;
      const subscriptionId = session.subscription as string;

      // Fetch the subscription details
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const planId = subscription.items.data[0].price.id;

      // Map Stripe plan IDs to your plan names and limits
      const planMap: { [key: string]: { plan: string, setLimit: number, quizLimit: number } } = {
        'price_learner': { plan: 'learner', setLimit: 5, quizLimit: 5 },
        'price_student': { plan: 'student', setLimit: 10, quizLimit: 10 },
        'price_studyholic': { plan: 'studyholic', setLimit: 20, quizLimit: 20 },
      };

      const planInfo = planMap[planId] || { plan: 'free', setLimit: 1, quizLimit: 1 };

      // Get the Supabase client
      const supabase = createClient();

      // Update the user's profile information
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          plan: planInfo.plan,
          setLimit: planInfo.setLimit,
          quizLimit: planInfo.quizLimit,
          free_cards: false,
          free_quiz: false,
        })
        .eq('email', customerEmail);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        return NextResponse.json({ status: "error", message: "Failed to update profile" }, { status: 500 });
      }

      return NextResponse.json({ status: "success", message: "Subscription updated" });
    }

    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "error", error: (error as Error).message }, { status: 400 });
  }
}