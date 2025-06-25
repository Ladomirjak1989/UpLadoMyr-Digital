import Banner from '@/components/Banner/HomeBanner';
import HomePage from '@/components/Pages/HomePage/HomePage';
import PaymentSteps from '@/components/PaymentSteps/PaymentSteps';
import ServicesPricing from '@/components/ServicesPricing/ServicesPricing';

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <HomePage />
      </main>
    </div>
  );
}
