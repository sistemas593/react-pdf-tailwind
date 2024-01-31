import { useEffect, useState } from "react";
import { Paginator } from "../../Components/Paginator";
import BuscadorRecfacturas from "../../Components/BuscadorRecfacturas";
import Table from "./Table";
import { useRecfacturas } from "../../Hooks/useRecfacturas";
import { handlerPaginator } from "../../Hooks/handlerPaginator";

export const RecfacturasPage = () => {

  const [estado, setEstado] = useState('')
  
  const { getAllFacturas } = useRecfacturas();

  const [ actualPage, setActualPage] = useState(0);
  const [ actualFilter, setActualFilter] = useState("");
  const [ actualSort, setActualSort] = useState("");
  const [ actualSize, setActualSize]= useState(10);

  const [ dataFacturas, setDataFacturas] = useState([])
  const [ dataPaginator, setDataPaginator] = useState({})

  const getFacturas = async () =>{
    const result = await getAllFacturas(0, actualSize, '', actualSort);            
    setDataFacturas(result.content)    
    setDataPaginator(handlerPaginator(result))
    setActualPage(0);    
  }

  const onBuscador = async (userFilter ) => {
    const result = await getAllFacturas(0, actualSize, userFilter, actualSort);            
    setDataFacturas(result.content)
    setDataPaginator(handlerPaginator(result))
    setActualFilter(userFilter);
    setActualPage(0);

    setEstado('Filtrado')
  };

  const onPaginator = async (userPage) => {
    setActualPage(userPage);
    const result = await getAllFacturas(userPage, actualSize, actualFilter, actualSort);
    setDataFacturas(result.content)
    setDataPaginator(handlerPaginator(result))
  };

  const onOrder = async (userSort) => {
    setActualPage(0);
    setActualSort(userSort);
    const result = await getAllFacturas(0, actualSize, actualFilter, userSort);
    setDataFacturas(result.content)
    setDataPaginator(handlerPaginator(result))
  };

  const [sincroniza, setSincroniza] = useState(0)

  useEffect(() => {
    if (actualFilter.length > 0 && estado==='Filtrado'){
      console.log('getFacturas');
      getFacturas()
    }
  }, [sincroniza])  

  const sincronizar = () =>{
    console.log('sincronizar');
    setSincroniza(sincroniza+1)
  }

  const vaciar = () =>{
    setDataFacturas([])
    setDataPaginator({})
    setEstado('')
  }

  return (
    <>
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">       
      <main>

        <div className="relative isolate overflow-hidden pt-4">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Facturas recibidas</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lista de facturas electronicas recibidas.
          </p>
        </div>

        <BuscadorRecfacturas onBuscador={onBuscador} vaciar={vaciar}/>

        {
        estado==='Filtrado'
        ?
          dataFacturas.length === 0 
          ? 
          (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">No existen registros con los parametros de busqueda</p>
          </div>
            ) 
            :
             (
            <>
              <Table onOrder={onOrder} dataFacturas={dataFacturas} sincronizar={sincronizar}/>
              <Paginator
                paginator={dataPaginator}
                onPaginator={onPaginator}
                actualPage={actualPage}              
                actualSize={actualSize}
              />
            </>
          )

          :
            (
              <div className="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
              <p className="font-bold">Ingrese los parametros y haga clic en el boton buscar</p>
            </div>
  
            )

        }

      {estado==='Cargando' &&
            <>
            <h1>Cargando</h1>
            </>
      }

      </main>
      </div>


    </>
  );
};
