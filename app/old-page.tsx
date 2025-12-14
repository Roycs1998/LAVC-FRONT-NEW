import { redirect } from "next/navigation";
import Home from "./(home)/page"; 



export default function Main() {
  return <Home params={{
    lang: "en"
  }} />;
}
