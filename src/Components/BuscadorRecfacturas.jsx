import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatearFecha } from "../Hooks/formatearFecha";
import { useToastify } from "../Hooks/useToastify";

function Buscador(props) {
  const [invalidForm, setInvalidForm] = useState(false);

  const { register, formState:{ errors }, handleSubmit, reset, watch } = useForm();

  const onSubmit = (data) => {
    setInvalidForm(false);
    if ((data.userSerie!=='') || (data.userSecuencia!=='') || (data.userClaveAcceso!=='') || (data.userNumeroIdentificacion!=='') || (data.userFechaEmisionDesde!=='')){
      //${data.userNumeroIdentificacion && `&numeroIdentificacion=${data.userNumeroIdentificacion}`}
      const userFilter = `${data.userSerie && `&serie=${data.userSerie}`}${data.userSecuencia && `&secuencia=${data.userSecuencia}`}${data.userClaveAcceso && `&claveAcceso=${data.userClaveAcceso}`}${data.userNumeroIdentificacion && `&numeroIdentificacion=${data.userNumeroIdentificacion}`}${data.userFechaEmisionDesde && `&fechaEmisionDesde=${formatearFecha(data.userFechaEmisionDesde)}`}${data.userFechaEmisionHasta && `&fechaEmisionHasta=${formatearFecha(data.userFechaEmisionHasta)}`}${data.userTipoDocumento && `&tipoDocumento=${data.userTipoDocumento}`}${data.userDestino && `&destino=${data.userDestino}`}`
      props.onBuscador(userFilter); //, 
    }else{
      useToastify("Ingrese parametros para la busqueda")
    }
  };

  const limpiar = () => {
    setInvalidForm(false);
    reset();
    props.vaciar()
  };

  const refresh = () => {
    alert("refresh");
  };

  useEffect(() => {
    window.addEventListener("beforeunload", refresh);
  }, []);

  return (
    <>
    
        <div className="flex-auto gap-2">

            <form onSubmit={ handleSubmit( onSubmit) }>

                  <div className="block relative">         
                     <label htmlFor="tipoDocumento" className="block text-sm font-medium leading-6 text-gray-600">
                        Tipo de documento
                      </label>
                      <select
                                  id="location"
                                  name="location"
                                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  {...register('userTipoDocumento', {
                                    
                                  })}
                                  defaultValue=""
                                >
                                  <option value ="">Todos</option>
                                  <option value ="FAC">Factura</option>
                                  <option value ="NCR">Nota de Credito</option>
                                  <option value ="NDB">Nota de Credito</option>                             
                                </select>
                  </div>

                  <div className="block relative">         
                     <label htmlFor="claveAcceso" className="block text-sm font-medium leading-6 text-gray-900">
                        Clave de acceso
                      </label>
          
                    <input id="userClaveAcceso" maxLength={50}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                        {...register('userClaveAcceso', {
                        required: false,
                        minLength:49,
                        maxLength:49
                      })}
                      />
              </div>

              <div className="block relative">                   

                    <label htmlFor="serie" className="block text-sm font-medium leading-6 text-gray-900">
                        Serie
                      </label>
                    <input id="userSerie" maxLength={50}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                        {...register('userSerie', {
                        required: false,
                        minLength:6,
                        maxLength:6
                      })}
                      />
              </div>

              <div className="block relative">                   
                    <label htmlFor="secuencia" className="block text-sm font-medium leading-6 text-gray-900">
                        Secuencia
                      </label>

                    <input id="userSecuencia" maxLength={50}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                        {...register('userSecuencia', {
                        required: false,
                        minLength:9,
                        maxLength:9
                      })}
                      />

              </div>

              <div className="block relative">                   
                     <label htmlFor="numeroIdentificacion" className="block text-sm font-medium leading-6 text-gray-900">
                        Numero Identificacion
                      </label>

                    <input id="userNumeroIdentificacion" maxLength={50}
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" 
                        {...register('userNumeroIdentificacion', {
                        required: false,
                        minLength:3,
                        maxLength:15
                      })}
                      />

              </div>

              <div className="block relative">
                     <label htmlFor="userFechaEmisionDesde" className="block text-sm font-medium leading-6 text-gray-900">
                     Fecha emisión desde
                      </label>
                   
                    <input id="userFechaEmisionDesde" maxLength={50}
                      type="date"
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                        {...register('userFechaEmisionDesde', {
                          required: false                          
                        })}
                        />
              </div>

              <div className="block relative">                   
              <label htmlFor="userFechaEmisionHasta" className="block text-sm font-medium leading-6 text-gray-900">
                     Fecha emisión hasta
                      </label>

                    <input id="userFechaEmisionHasta" maxLength={50}
                      type="date"
                      className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                      {...register('userFechaEmisionHasta', {
                        required: false                          
                      })}
                      />
              
              </div>

              <div className="block relative">         
                     <label htmlFor="destino" className="block text-sm font-medium leading-6 text-gray-600">
                        Destino
                      </label>
                      <select
                                  id="location"
                                  name="location"
                                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  {...register('userDestino', {
                                    
                                  })}
                                  defaultValue=""
                                >
                                  <option value ="">Todos</option>
                                  <option value ="IR">I.Renta</option>
                                  <option value ="IV">IVA</option>
                                  <option value ="OT">Otros</option>                             
                                </select>
                  </div>


                <button
                     type="submit">
                      Buscar
                </button>
            </form>
          
          <div className="flex-auto">      
            <button 
            className=""
            onClick={limpiar}>Limpiar</button>
          </div>

      </div>
      {invalidForm && <p className="text-red-400">Este campo no puede estar vacio</p>}

    </>
  );
}

export default Buscador;
