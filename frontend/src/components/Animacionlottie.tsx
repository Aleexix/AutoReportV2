
import Lottie from "react-lottie-player";
import animationData from "../assets/Images/Animation - 1741547438858.json"; // Importa tu animación

const Animacionlottie = () => {
  return (
    <Lottie
      loop
      play
      animationData={animationData}
      style={{ width: 300, height: 200,  }} // Ajusta el tamaño según necesites
    />
  );
};

export default Animacionlottie;
