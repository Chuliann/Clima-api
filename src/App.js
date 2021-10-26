import {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar) {
        const appId = 'a4a8484c968549c20a26d50451c97b61';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);

        guardarConsultar(false);

        (resultado.cod === "404" ? guardarError(true) : guardarError(false))
      }
      
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);


  let componente = (error ? <Error mensaje="No hay resultados"/> : <Clima resultado={resultado}/>);

  return (
    <Fragment>
      <Header 
        titulo={"Clima React App"}
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
