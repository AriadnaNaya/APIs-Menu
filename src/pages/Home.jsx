import React from 'react';
import {
	Typography,
	Container,
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from '../components/Header';
import MenuList from '../components/MenuList';
import data from '../data/menuData';
import formatTitle from '../utils/formatTitle';
import grupoCategorias from '../utils/grupoCategorias';

const Home = () => {
	return (
		<div>
			<Header />

			{/* Título principal */}
			<Typography variant="h3" sx={{ my: 3, textAlign: 'center' }}>
				Sushi Town Menu
			</Typography>

			{/* Contenedor blanco */}
			<Container maxWidth="lg" sx={{ backgroundColor: '#fff', p: 2, borderRadius: 2 }}>
				{/* Sección para cada grupo */}
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
					{Object.entries(grupoCategorias).map(([grupo, tipos]) => (
						<Box key={grupo}>
							<Typography variant="h4" sx={{ mb: 2 }}>
								{formatTitle(grupo)}
							</Typography>
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
								{tipos.map((tipo) => (
									<Accordion
										key={tipo}
										defaultExpanded
										disableGutters
										square
										sx={{
											boxShadow: 'none',
											borderBottom: '1px solid #333',
											'&:before': { display: 'none' }
										}}
									>
										<AccordionSummary
											expandIcon={<ExpandMoreIcon />}
											sx={{
												minHeight: 48,
												pb: 0,
												'& .MuiAccordionSummary-content': {
													margin: 0,
													whiteSpace: 'normal'
												}
											}}
										>
											<Typography variant="h5">
												{formatTitle(tipo)}
											</Typography>
										</AccordionSummary>
										<AccordionDetails sx={{ px: 2, pt: 1, pb: 3 }}>
											<MenuList meals={data[tipo]} />
										</AccordionDetails>
									</Accordion>
								))}
							</Box>
						</Box>
					))}
				</Box>
			</Container>
		</div>
	);
};

export default Home;
