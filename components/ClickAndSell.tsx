import HeroSection from './common/HeroSection';
import CurrencyOrderForm from './common/CurrencyOrderForm';
import Faq from './sections/Faq';
import { NotesFan } from './visuals/Illustrations';

const ClickAndSell = () => {
  return (
    <>
      <HeroSection
        eyebrow="Click & Sell"
        heading="Sell your leftover currency"
        highlight="leftover"
        visual={<NotesFan className="mx-auto w-full max-w-md animate-float" />}
        description="Turn unused foreign notes back into pounds at preferential rates. Book online, then bring your notes to our Grays branch."
      />
      <CurrencyOrderForm
        heading="Add currency"
        showOption="sell"
        showPersonalDetails={true}
        defaultCurrency="USD"
        showCart={true}
        isHomePage={false}
      />
      <Faq only={['notes', 'anyCurrency', 'id', 'rate', 'cancel']} />
    </>
  );
};

export default ClickAndSell;
