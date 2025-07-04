import { DateTime } from 'luxon';

<TableBody>
    {slots.map(slot => {
        const dtAR = DateTime.fromISO(slot.datetime, { zone: 'utc' }).setZone('America/Argentina/Buenos_Aires');
        const display = dtAR.toFormat('dd/MM/yyyy HH:mm');
        return (
            <TableRow key={slot.datetime}>
                <TableCell>{display}</TableCell>
                <TableCell>{slot.people}</TableCell>
            </TableRow>
        );
    })}
</TableBody> 