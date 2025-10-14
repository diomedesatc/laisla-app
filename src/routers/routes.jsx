import {Routes, Route, Navigate} from "react-router-dom";
import { Home, Login, ProtectedRoute, UserAuth, Configuraciones, Categorias, useUsuarioStore, Spinner1, useEmpresaStore, Productos, POS, Layout, PageNot, Empresa, MonedaConfig, ClientesProveedores } from "../index";
import { useQuery } from "@tanstack/react-query";
import { BasicosConfig } from "../components/organismos/empresaConfigDesing/BasicosConfig";
import { MetodosPago } from "../pages/MetodosPago";
import { Dashboard } from "../pages/Dashboard";
import { SucursalesCaja } from "../pages/SucursalesCaja";
import { Impresoras } from "../pages/Impresoras";
import { Usuarios } from "../pages/Usuarios";
import {Almacenes} from "../pages/Almacenes"
export function MyRoutes(){

    return(
    <Routes>
        <Route path="/login" 
        element={            
            <ProtectedRoute accessBy="non-authenticated" >
                <Login />
            </ProtectedRoute>
        }>
        </Route>
        <Route path="/configuracion"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <Configuraciones />
            </ProtectedRoute>
            </Layout>

        } />

        <Route path="/configuracion/sucursalcaja"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <SucursalesCaja />
                
            </ProtectedRoute>
            </Layout> 

        } />
        <Route path="/configuracion/almacenes"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <Almacenes />
                
            </ProtectedRoute>
            </Layout> 

        } />
        <Route path="/configuracion/usuarios"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <Usuarios />
                
            </ProtectedRoute>
            </Layout> 

        } />
        
        <Route path="/configuracion/categorias"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
               
                    <Categorias />
                
            </ProtectedRoute>
            </Layout> 
        } />
        
        <Route path="/configuracion/productos"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <Productos />
                
            </ProtectedRoute>
            </Layout> 

        } />
        <Route path="/configuracion/clientes"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated">
                
                    <ClientesProveedores />
                
            </ProtectedRoute>
            </Layout>
        }/>
        <Route path="/configuracion/proveedores"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated">
                
                    <ClientesProveedores />
                
            </ProtectedRoute>
            </Layout>
        }/>
        
        <Route path="/configuracion/metodospago"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated">
                
                    <MetodosPago />
                
            </ProtectedRoute>
            </Layout>
        }/>
        <Route path="/configuracion/impresoras"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated">
                
                    <Impresoras />
                
            </ProtectedRoute>
            </Layout>
        }/>
        <Route path="/configuracion/empresa"
        element={
        <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <Empresa />
            </ProtectedRoute>
        </Layout> 

        }>
            <Route 
            index
            element = {
                <Navigate to="empresabasicos" />
            }
            />
            <Route             
            path="empresabasicos" 
            element = {
                <BasicosConfig />
            }
            />
            <Route path="moneda" 
            element = {
                <MonedaConfig />
            } 
            />
        </Route>
        <Route path="/"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated">
                
                    <Dashboard />
                
            </ProtectedRoute>
            </Layout>
        }/>
        
        <Route path="/pos"
        element={
            <Layout>
            <ProtectedRoute accessBy="authenticated" >                
                
                    <POS />
                
            </ProtectedRoute>
            </Layout> 

        } />
        <Route path="*" element={<PageNot />} />
        
    </Routes> 
    )

}  