<template>
  <div class="min-h-screen flex flex-col items-center">
    <div>
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900">Choose Your Plan</h1>
        <p class="mt-4 text-gray-600">
          Dive deeper into the richness of Chinese mystic knowledge. Select the plan that
          suits you best.
        </p>
      </div>

      <!-- Pricing Plans -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Render Pricing Cards Dynamically -->
        <div
          v-for="(plan, index) in pricingPlans"
          :key="index"
          class="relative bg-white shadow-lg rounded-lg p-8 flex flex-col items-center transition-transform duration-300 hover:scale-105"
          :class="plan.borderColor"
          :style="{ minHeight: plan.minHeight, border: '2px solid transparent' }"
        >
          <!-- Discount Badge -->
          <div
            v-if="plan.discount > 0"
            class="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            <span class="text-xl">-{{ plan.discount }}%</span>
          </div>

          <h2 class="text-2xl font-bold text-gray-900">{{ plan.title }}</h2>
          <p class="text-gray-500 mt-2">{{ plan.description }}</p>

          <!-- Price Section -->
          <div class="my-6">
            <div class="flex items-baseline space-x-2">
              <span class="text-5xl font-extrabold text-gray-900">
                ${{ calculateDiscountedPrice(plan.price, plan.discount) }}
              </span>
              <span v-if="plan.discount > 0" class="line-through text-gray-400 text-sm">
                ${{ plan.price }}
              </span>
            </div>
            <span class="text-gray-500 text-lg">/month</span>
          </div>

          <!-- Features -->
          <ul class="text-gray-600 space-y-3 mb-6 text-sm">
            <li v-for="(feature, i) in plan.features" :key="i">{{ feature }}</li>
          </ul>

          <!-- Call to Action -->
          <NuxtLink
            :to="plan.link"
            class="px-6 py-3 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition"
          >
            Get Started
          </NuxtLink>
        </div>
      </div>
    </div>

    <div id="paypal-checkout" class="p-6"></div>
  </div>
</template>

<script setup>
let nuxtApp = useNuxtApp();

const pricingPlans = [
  {
    title: "Basic",
    description: "Ideal for beginners",
    price: 0.99,
    discount: 50, // 50% OFF
    features: ["Access to 100+ articles", "Monthly newsletter", "Community support"],
    borderColor: "hover:border-indigo-300",
    link: "/checkout?plan=basic",
    minHeight: "500px",
  },
  {
    title: "Standard",
    description: "For dedicated learners",
    price: 9.99,
    discount: 20, // 20% OFF
    features: [
      "Everything in Basic",
      "Exclusive video content",
      "Bi-weekly webinars",
      "Priority support",
    ],
    borderColor: "hover:border-green-300",
    link: "/checkout?plan=standard",
    minHeight: "550px",
  },
  {
    title: "Premium",
    description: "For cultural enthusiasts",
    price: 69.99,
    discount: 0, // No discount
    features: [
      "Everything in Standard",
      "1-on-1 cultural consultations",
      "Early access to new content",
      "Exclusive e-books",
    ],
    borderColor: "hover:border-yellow-300",
    link: "/checkout?plan=premium",
    minHeight: "550px",
  },
];

onMounted(async () => {
  await usePaypalButton({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: 100, // 动态设置金额
              currency_code: "USD",
            },
          },
        ],
      });
    },
    onApprove: async (data, actions) => {
      try {
        const details = await actions.order?.capture();
        console.log("Payment completed successfully:", details);
      } catch (error) {
        console.error("Error capturing payment:", error);
      }
    },
  });
});

// Function to calculate the discounted price
const calculateDiscountedPrice = (price, discount) => {
  return (price * (1 - discount / 100)).toFixed(2);
};

const nuxt = useNuxtApp();

console.log(nuxt.$paypal?.version);
</script>

<style scoped>
/* 优化的折扣徽标样式 */
</style>
