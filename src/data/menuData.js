import { data as flatData } from './data';

const groupedData = flatData.reduce((acc, item) => {
    const { tipo } = item;
    if (!tipo) return acc; // ignorar si no tiene tipo
    if (!acc[tipo]) {
        acc[tipo] = [];
    }
    acc[tipo].push(item);
    return acc;
}, {});

export default groupedData;
