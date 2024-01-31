import { Route, Routes } from "react-router-dom"
import { RecfacturasPage } from './Pages/Recfacturas/RecfacturasPage';
import  FacturaVer  from './Pages/FacturaVer/FacturaVer';

export const App = () => {
    return (
            <Routes>
                <Route path='/' element={<RecfacturasPage />} />				              							         
            </Routes>
    )
    
}