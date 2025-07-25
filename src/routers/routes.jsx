import {Routes, Route} from "react-router-dom";
import { Home, Login, ProtectedRoute, UserAuth, Configuraciones, Categorias, useUsuarioStore, Spinner1, useEmpresaStore, Productos, POS, Layout, PageNot } from "../index";
import { useQuery } from "@tanstack/react-query";
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
        <Route path="/"
        element={
            <ProtectedRoute accessBy="authenticated" >                
                <Layout>
                    <Home />
                </Layout> 
            </ProtectedRoute>

        } />
        <Route path="/configuracion"
        element={
            <ProtectedRoute accessBy="authenticated" >                
                <Layout>
                    <Configuraciones />
                </Layout> 
            </ProtectedRoute>

        } />
        
        <Route path="/configuracion/categorias"
        element={
            <ProtectedRoute accessBy="authenticated" >                
                <Layout>
                    <Categorias />
                </Layout> 
            </ProtectedRoute>

        } />
        
        <Route path="/configuracion/productos"
        element={
            <ProtectedRoute accessBy="authenticated" >                
                <Layout>
                    <Productos />
                </Layout> 
            </ProtectedRoute>

        } />
        <Route path="/pos"
        element={
            <ProtectedRoute accessBy="authenticated" >                
                <Layout>
                    <POS />
                </Layout> 
            </ProtectedRoute>

        } />
        <Route path="*" element={<PageNot />} />
        
    </Routes> 
    )

}  