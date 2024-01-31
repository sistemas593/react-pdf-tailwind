import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import recfacturasApi from "../apis/recfacturasApi";
import { useToastify } from "./useToastify";

export const useRecfacturas = () => {
  const navigate = useNavigate();

  const getAllFacturas = async (page = 0, size = 20, filter = "", sort = "") => {
    try {
      const result = await recfacturasApi.get(`ABCD/AB01?page=${page}&size=${size}${filter}${sort}`);  
      return (result.data)
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const getFacturaById = async ( 
    idRecibida
  ) => {
    try {
        const result = await recfacturasApi.get(`ABCD/AB01/${idRecibida}`); 
        return result.data;
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  const handlerSave = async (recfacturaData) => {
    console.log(recfacturaData);
    try {
      if (recfacturaData.idRecibida === '') {
        const response =await recfacturasApi.post('/ABCD', recfacturaData );   
        //dispatch(reducerAdd(response.data));
      } else {
        const response =await recfacturasApi.put(`ABCD/${recfacturaData.idRecibida}`, recfacturaData);
        //dispatch(reducerUpdate(response.data));
      }
      Swal.fire(
        recfacturaData.idRecibida === '' ? "Registro Creado" : "Registro Actualizado",
        recfacturaData.idRecibida === ''
          ? "El registro ha sido creado con exito!"
          : "El registro ha sido actualizado con exito!",
        "success"
      );
      navigate("/recfacturas");
    } catch (error) {
      //dispatch(loadingError(error.response.data));
      return error
    }
  };

  const handlerRemove = async (idRecibida) => {
    try {
      await recfacturasApi.delete(`ABCD/AB01/${idRecibida}`);
      useToastify('El registro ha sido eliminado con exito!')
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  return {
    handlerSave,
    handlerRemove,
    getAllFacturas,
    getFacturaById,
  };
};
