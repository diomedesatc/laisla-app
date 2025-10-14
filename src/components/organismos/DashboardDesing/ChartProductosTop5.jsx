import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { useVentasStore } from "../../../store/VentasStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useThemeStore } from "../../../store/ThemeStore";


export function ChartProductosTop5(){
    const {dataEmpresa} = useEmpresaStore();
    const {porcentajeCambio} = useVentasStore();
    const isPositive = porcentajeCambio > 0;
    const isNeutral = porcentajeCambio === 0;
    const {themeStyle} = useThemeStore();
     const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        }
        ];
    return(
        <Container>
            <Header>
                <Title>Top 5</Title>
                <Subtitle>Productos por cantidad vendida</Subtitle>
            </Header>
            {
                data.map((item, index) => {
                    return(
                        <Row>
                            <NameContent>
                                <Name>{item.name}</Name>
                            </NameContent>
                            <Stats>
                                <Value>45</Value>
                                <Percentage>45%</Percentage>

                            </Stats>
                            
                        </Row>
                    )
                })
            }
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    }}
                >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: "#9ca3af"}} />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar strokeWidth={6} type="monotone" dataKey="uv"  fill= {themeStyle.text} activeDot={{r: 6}} fillOpacity={1} radius={[10, 10, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>

        </Container>
    )
}

const CustomTooltip = ({active, payload, label}) =>{
    const {dataEmpresa} = useEmpresaStore();
    if(active && payload && payload.length){
        return(
            <TooltipContainer>
                <Date>{label}</Date>
                <Value>
                    {
                        FormatearNumeroDinero(payload[0].value, dataEmpresa?.currency, dataEmpresa?.iso)
                    }
                </Value>

            </TooltipContainer>

        )
    }
}

const Stats = styled.div`
    display: flex;
    flex-direction:row;
    align-items: center;
    gap: 10px;
`
const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

`

const NameContent = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 2;
`
const Name = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${({theme}) => theme.text}
`

const Container = styled.div`
    padding: 20px;
    
`;

const TooltipContainer = styled.div`
    background: ${({theme}) => theme.bg};
    padding: 10px;
    border-radius: 8px;
    font-size: 12px;     
    box-shadow: ${({theme}) => theme.boxshadow};
`

const Date = styled.div`
    font-size: 14px;
`

const Value = styled.span`
    font-size: 14px;
    font-weight: bold;
    color: ${({theme}) => theme.colortitlecard}
`;

const Header = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const Title = styled.h3`
    font-size: 25px;
    font-weight: bold;
    color: ${({theme}) => theme.text};
    margin: 0;

`

const MainInfo = styled.div`
    margin: 20px 0;

    
`

const Revenue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: ${({theme}) => theme.text}

`
const Change = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
`;
const Percentage = styled.span`
    font-size: 12px;
    font-weight: bold;
    color: #828282;
`;

const Subtitle = styled.p`
    font-size: 18px;
    color: #6b7280;
    margin: 5px 0 0;
`