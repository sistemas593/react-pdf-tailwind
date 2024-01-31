import React, { useState } from 'react'
import arribaIcono from '../../assets/arriba.png'
import abajoIcono from '../../assets/abajo.png'
import { useRecfacturas } from "../../Hooks/useRecfacturas";
import './Table.css'
import { formatearFecha } from '../../Hooks/formatearFecha';
import Swal from 'sweetalert2';

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  PrinterIcon,
} from '@heroicons/react/20/solid'

function ListTable( props ) {

  const totales = {
    "baseCero":"0.00",
    "baseGravada":"1000.00",
    "iva":"120.00",
    "baseExenta":"33312.30",
    "baseNoObjeto":"1556562.30",
  }  
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
    const { handlerRemove, getFacturaById } = useRecfacturas(); 
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('') 

    const headProps = [
      {
        "title":"Clave acceso",
        "name":"claveAcceso",
      },
      {
        "title":"RUC/CI",
        "name":"numeroIdentificacion",
      },
      {
        "title":"Fecha emision",
        "name":"fechaEmision",
      },
      {
        "title":"Serie",
        "name":"serie",
      },
      {
        "title":"Secuencia",
        "name":"secuencia",
      },
      {
        "title":"Base Cero",
        "name":"baseCero",
      },
      {
        "title":"Base Gravada",
        "name":"baseGravada",
      },
      {
        "title":"IVA",
        "name":"iva",
      },
      {
        "title":"Base Exenta",
        "name":"baseExenta",
      },
      {
        "title":"Base no Objeto",
        "name":"baseNoObjeto",
      },

      {
        "title":"Destino",
        "name":"destino",
      },

      {
        "title":"",
        "name":"opciones",
      },
    ]

    const sortTable =( name ) =>{
      if(name === "opciones" || name==="eliminar"){
        return
      }
        let sentido
        if (name !== order){
            setOrder(name);
            sentido='ASC'
        }else{ 
            if ( sort=== '' ){
              sentido='ASC'                
            }
            if ( sort=== 'ASC' ){
              sentido='DESC'            
            }
            if ( sort=== 'DESC' ){
              sentido=''            
            }                    
        }
        
        let userSort = ''
        if (sentido!== ''){
          let userOrder = sentido.toLowerCase()
          userSort = '&sort=' + name
          userSort = userSort +',' +userOrder
        }else{
          userSort = '&sort=claveAcceso,ASC'
        }

        setSort (sentido)                
        props.onOrder(userSort)

      }

    const verFactura = async (idRecibida)=>{
      const dataFactura = await getFacturaById(idRecibida)      
      console.log(dataFactura.xml);
    }

    const eliminar = async (idRecibida) =>{

      Swal.fire({
        title: "Esta seguro que desea eliminar?",
        text: "Cuidado el registro será eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then(async (result) => {
        if (result.isConfirmed) {
            await handlerRemove(idRecibida)
            props.sincronizar()
        }
      });

    }

  return (
    <>


    <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  

                        {headProps.map(prop => 
                            <React.Fragment key={prop.name}>
                                <th scope="col" 
                                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 titulosTabla"
                                onClick={ ()=> {sortTable(prop.name)}  }
                                 >
                                    <div>
                                        <span>
                                        {prop.title}
                                        </span>
                                        {sort==='ASC' && order === prop.name && <img src={arribaIcono} alt="" />}
                                        {sort==='DESC' && order === prop.name && <img src={abajoIcono} alt="" />}
                                        
                                    </div>
                                </th>
                            </React.Fragment>
                        )}
                  
                  
                </tr>
              </thead>
              <tbody>


              {props.dataFacturas.map( recfactura =>
                    <React.Fragment key={recfactura.idRecibida}>
                        <tr>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.claveAcceso}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.numeroIdentificacion}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {formatearFecha(recfactura.fechaEmision)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.serie}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.secuencia}
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.baseCero}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.baseGravada}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.iva}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.baseExenta}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                {recfactura.baseNoObjeto}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">

                                <select
                                  id="location"
                                  name="location"
                                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={recfactura.destino}
                                >
                                  <option value=''>Seleccionar</option>
                                  <option value='IV'>IVA</option>
                                  <option value='IR'>I.Renta</option>
                                </select>

                            </td>


<td>

<Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Opciones
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            
          <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm w-full'
                  )}
                  onClick={() => verFactura(recfactura.idRecibida)}                                  
                >
                  <PrinterIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Ver
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <PencilSquareIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Editar
                </a>
              )}
            </Menu.Item>



            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Duplicar
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArchiveBoxIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Archive
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowRightCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Mover
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <UserPlusIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Compartir
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HeartIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  Add to favorites
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={() => eliminar(recfactura.idRecibida)} 
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <TrashIcon 
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true"
                  />
                  Eliminar
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  

</td>




                        </tr>
                    </React.Fragment>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>



    </>
  )
}

export default ListTable


