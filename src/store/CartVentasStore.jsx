import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useClientesStore } from "./ClientesStore";

const initialState = {
    items: [],
    total: 0,
    statePantallaCobro: false,
    tipoDeCobro: "",
    stateMetodosPago: false
}

const CalcularTotal = (items) => {
    return items.reduce((total, item) => {
        // Ensure _precio_venta and _cantidad exist to prevent NaN
        const price = item._precio_venta || 0;
        const quantity = item._cantidad || 0;
        return total + (price * quantity);
    }, 0);
}

export const useCartVentasStore = create(
    persist(
        (set) => ({
            ...initialState,

            addItem: (p) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item._id_producto === p._id_producto
                    );

                    if (existingItem) {
                        const updatedItems = state.items.map((item) => {
                            if (item._id_producto === p._id_producto) {
                                const newQuantity = item._cantidad + (p._cantidad || 1);
                                return { ...item, _cantidad: newQuantity, _total: newQuantity * item._precio_venta};
                            }
                            return item;
                        });
                        return { items: updatedItems, total: CalcularTotal(updatedItems) };
                    } else {
                        // When adding a new item, ensure it has a _cantidad property, default to 1
                        const newItem = { ...p, _cantidad: p._cantidad ? p._cantidad : 1 };
                        const newItems = [...state.items, newItem];
                        return { items: newItems, total: CalcularTotal(newItems) };
                    }
                }),

            removeItem: (p) => set((state) => {
                const updatedItems = state.items.filter((item) => item !== p);
                return {
                    items: updatedItems,
                    total: CalcularTotal(updatedItems),
                }
            }),

            resetState: () => {
                const {selectClienteProveedor} = useClientesStore.getState();
                selectClienteProveedor([]);
                set(initialState);
            },

            addcantidaditem: (p) => set((state) => {
                const updatedItems = state.items.map((item) => {
                    if (item._id_producto === p._id_producto && item._cantidad > 0) {
                        return { ...item, _cantidad: item._cantidad + 1, _total: p._precio_venta * (item._cantidad + 1)};
                    }
                    return item;
                });
                return { items: updatedItems, total: CalcularTotal(updatedItems) };
            }),

            restarcantidaditem: (p) => set((state) => {
                const updatedItems = state.items.map((item) => {
                    if (item._id_producto === p._id_producto && item._cantidad > 0) {
                        const updatedQuantity = item._cantidad - 1;
                        if (updatedQuantity === 0) {
                            return null; // Mark for removal
                        } else {
                            return { ...item, _cantidad: updatedQuantity, _total: p._total - p._precio_venta};
                        }
                    }
                    return item;
                }).filter(Boolean); // Remove items marked as null

                return { items: updatedItems, total: CalcularTotal(updatedItems) };
            }),
            updateCantidadItem:(p, cantidad) => set((state) => {
                const updatedItems = state.items.map((item) => {
                    if(item._id_producto === p._id_producto){
                        const updatedItem = {
                            ...item, _cantidad: cantidad,
                            _total: cantidad * item._precio_venta
                        }
                        return updatedItem;
                    }
                    return item;
                })
                return {items: updatedItems, total: CalcularTotal(updatedItems)}

            }), 
            setStatePantallaCobro: (p) => set((state) =>{
                if(state.items.length == 0){
                    toast.warning("No puedes cobrar si no hay productos ingresados.");
                    return{
                        state
                    }
                }else{
                    return {
                        statePantallaCobro: !state.statePantallaCobro,
                        tipoDeCobro: p.tipoDeCobro
                    }
                }
            }),
            setStateMetodosPago:() => set((state) => ({stateMetodosPago: !state.stateMetodosPago})),

        }),
        {
            name: "cart-ventas-storage" // Key for local storage
        }
    )
);