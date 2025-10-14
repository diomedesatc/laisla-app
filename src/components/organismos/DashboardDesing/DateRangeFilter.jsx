import styled from "styled-components";
import {DatePicker} from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { useDashboardStore } from "../../../store/DashboardStore";
const  {RangePicker} = DatePicker

export function DateRangeFilter(){
    const [activeRange, setActiveRange] = useState("Todo");
    const [dates, setDates] = useState([
        dayjs("2024-01-01"),
        dayjs("2040-12-31")
    ]);
    const [singleDate, setSingleDate] = useState(null);
    const {fechaInicio, fechaFin, setRangoFechas, limpiarFechas} = useDashboardStore();

    const setSiempreRange = () => {
        const startDate = dayjs("2024-01-01");
        const endDate = dayjs("2040-12-31");
        setDates([startDate, endDate]);
        setActiveRange("Todo");
        setRangoFechas(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
    }

    const handleDateChange = (val) => {
        setDates(val || []);
        if(val){
            setRangoFechas(val[0].format("YYYY-MM-DD"), val[1].format("YYYY-MM-DD"));
        }
    }

    const setPresentRange = (days, rangeName) => {
        const startDate = dayjs().subtract(days, "day").startOf("day");
        const endDate = dayjs().endOf("day");
        setDates([startDate, endDate]);
        setRangoFechas(startDate.format("YYYY-MM-DD"), endDate.format("YYYY-MM-DD"));
        setActiveRange(rangeName)

    }

    const handleSingleDateChange = (date) => {
        setSingleDate(date)
        setDates([])
        if(date){
            setRangoFechas(date.format("YYYY-MM-DD"),date.format("YYYY-MM-DD"))

        }
        setActiveRange("Por dia")

    }

    
    const selectToday = () => {
        const today = dayjs().startOf("day");
        setSingleDate(today);
        setDates([]);
        setRangoFechas(today.format("YYYY-MM-DD"), today.format("YYYY-MM-DD"));
        setActiveRange("Hoy");
    };
    return(
        <Container>
            <ButtonGroup>
                <TimeRangeButton onClick={setSiempreRange} isActive = {activeRange === "Todo"}>
                    Todo
                </TimeRangeButton>
                <TimeRangeButton isActive = {activeRange === "7 dias"} onClick={() => setPresentRange(7,"7 dias")}>
                    Ultimos 7 dias
                    
                </TimeRangeButton>
                <TimeRangeButton isActive = {activeRange === "30 dias"} onClick={() => setPresentRange(30,"30 dias")}>
                    Ultimos 30 dias                    
                </TimeRangeButton>
                <TimeRangeButton isActive = {activeRange === "90 dias"} onClick={() => setPresentRange(90,"90 dias")}>
                    Ultimos 3 meses                    
                </TimeRangeButton>                
                <TimeRangeButton isActive = {activeRange === "Por dia"} onClick={() => setActiveRange("Por dia")}>
                    Por dia                    
                </TimeRangeButton>
                <TimeRangeButton isActive = {activeRange === "Hoy"} onClick={selectToday}>
                    Hoy                   
                </TimeRangeButton>
                <TimeRangeButton
                    isActive={activeRange === "Limpiar"}
                    onClick={()=>{
                        setDates([])
                        setSingleDate(null)
                        limpiarFechas()
                        setActiveRange("Rango")
                    }}>
                    Limpiar filtro
                </TimeRangeButton>
            </ButtonGroup>
            {
                (activeRange === "30 dias" || activeRange === "7 dias" || activeRange === "90 dias") 
                && 
                (<StyledRangePicker value={dates} onChange={handleDateChange} />)
            }
            {
                activeRange === "Por dia" && <StyledDatePicker onChange={handleSingleDateChange} />
            }

        </Container>
       
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px;
        
`;

const ButtonGroup = styled.div`
    
`;

const TimeRangeButton = styled.button`
    color: ${({theme}) => theme.text};
    background-color: ${({isActive, theme}) => isActive ? theme.bg : "transparent" };
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    
`;

const StyledRangePicker = styled(RangePicker)`
    background-color: ${({ theme }) => theme.bg};
    border: 2px dashed ${({ theme }) => theme.body};
    .ant-picker-input > input {
        color: ${({ theme }) => theme.text};
        font-weight: bold;
    }
    .ant-picker-input input::placeholder {
        color: ${({ theme }) => theme.text};
    }
    
    .ant-picker-suffix{
        color: ${({ theme }) => theme.text};
    }
    &:hover{
        background-color: ${({ theme }) => theme.body}; 
    }
    &:focus,
    &.ant-picker-focused {
        background-color: ${({ theme }) => theme.bg};
    
    }
        
`;

const StyledDatePicker = styled(DatePicker)`
    background-color: ${({ theme }) => theme.bg};
    border: 2px dashed ${({ theme }) => theme.body};
    .ant-picker-input > input {
        color: ${({ theme }) => theme.text};
        font-weight: bold;
    }
    .ant-picker-input input::placeholder {
        color: ${({ theme }) => theme.text};
    }
    
    .ant-picker-suffix{
        color: ${({ theme }) => theme.text};
    }
    &:hover{
        background-color: ${({ theme }) => theme.body}; 
    }
    &:focus,
    &.ant-picker-focused {
        background-color: ${({ theme }) => theme.bg};
    
    }
`;