import Banner from '@/components/Banner/HomeBanner';
import HomePage from '@/components/Pages/HomePage/HomePage';
import PaymentSteps from '@/components/PaymentSteps/PaymentSteps';

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <HomePage />
        <PaymentSteps />
      </main>
    </div>
  );
}
