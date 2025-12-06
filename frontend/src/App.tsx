import { Button } from './components/ui/button';
import zusLogo from "./assets/logo_zus_darker_with_text.svg";

function App() {
  return (
    <div className="max-w-xl h-[100vh] flex flex-col items-center justify-center text-center mx-auto">
      <div className="w-[250px] mb-[25px]">
        <img src={zusLogo} alt="Logo ZUS" />
      </div>
      <h1 className="text-3xl font-bold mb-3">Zakład Ubezpieczeń Społecznych</h1>
      <p className="mb-[25px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse dolore fuga aspernatur optio doloribus incidunt!
      </p>
      <Button className="cursor-pointer" onClick={() => alert('Test')}>Test button</Button>
    </div>
  );
}

export default App;
