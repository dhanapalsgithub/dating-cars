import Hero from "../components/Hero";
import Fleet from "../components/Fleet";
import Categories from "../components/Categories";
import Chennai from "../components/Chennai";
import BecomeHost from "../components/BecomeHost";
import FAQ from "../components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero /> 
       <Fleet limit={4} /> 
       <Categories /> 
      <Chennai /> 
       <BecomeHost /> 
       <FAQ /> 
    </main>
  );
}