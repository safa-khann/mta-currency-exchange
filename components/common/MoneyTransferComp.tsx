import Image from "next/image";
interface MoneyTransferProps {
    showAuth?:boolean;
    showGlobalPartners?:boolean;
}
const MoneyTransferComp:React.FC<MoneyTransferProps> = ({
    showAuth,
    showGlobalPartners
}) => {
  return (
    <>
       {/* Authorised */}
       {showAuth && (
        <div id="money-transfer" className=" w-full dark:bg-black px-4 pt-9 sm:pt-14 sm:px-8 lg:px-18 pb-5 sm:pb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-black dark:text-white/70 mb-5 sm:mb-7">Authorised By</h2>
           
            <div className="max-w-2xl mx-auto flex flex-wrap sm:flex-row gap-0  justify-between items-center">
                <Image
                    src="/images/fca.png"
                alt="Authorised by Financial Conduct Authority UK"
                width={180}
                height={40}
                className="w-35 sm:w-60"
                priority
                />
                <Image
                    src="/images/hmm.png"
                alt="Authorised by HM Revenue & Customs"
                width={180}
                height={40}
                className="w-35 sm:w-60"
                priority
                />
           
            </div>
        </div>
       )}
        {/* Global partners */}
        {showGlobalPartners && (
        <div className=" w-full px-4 dark:bg-black pt-10 sm:pt-0 md:pt-8 sm:px-8 lg:px-18 pb-0">
            <h2 className="text-start text-xl sm:text-3xl font-bold text-black dark:text-white/70 mb-5 sm:mb-8">Global Partners</h2>
            <div className="max-w-2xl mx-auto flex flex-wrap sm:flex-row gap-0 justify-between items-center">
                <Image
                    src="/images/moneygram logo.png"
                alt="Moneygram"
                width={180}
                height={40}
                className="w-35 sm:w-60"
                priority
                />
                <Image
                    src="/images/western union.png"
                alt="Western Union"
                width={180}
                height={40}
                className="w-35 sm:w-60"
                priority
                />
                <Image
                src="/images/riya-money-transfer.png"
                alt="Riya Money Transfer"
                width={200}
                height={200}
                className="mx-auto w-35 sm:w-60"
                priority
                />
            </div>
        </div>   
        )}
    </>
  );
};

export default MoneyTransferComp;