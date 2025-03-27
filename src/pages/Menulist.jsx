// ✅ MenuList.jsx (cards con expansión vertical para variantes)
import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardActions,
	Collapse,
	Typography,
	Chip,
	Box,
	IconButton,
	Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MenuList = ({ meals }) => {
	const [expandedCards, setExpandedCards] = useState({});

	const toggleExpand = (idx) => {
		setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
	};

	return (
		<section className="subcategory-section">
			<div className="meal-container">
				{meals.map((meal, idx) => {
					const hasVariants = meal.variantes && meal.variantes.length > 0;
					const expanded = expandedCards[idx] || false;

					return (
						<Card
							key={idx}
							variant="outlined"
							className="meal-card"
							sx={{
								borderRadius: 2,
								boxShadow: 1,
								borderColor: '#cce7cc',
								width: '100%',
								maxWidth: 360,
								justifySelf: 'start', // ⬅️ Alinear a la izquierda
							}}
						>
							<CardContent>
								{meal.img && (
									<img
										src={meal.img}
										alt={meal.nombre || meal.title}
										style={{
											width: '100%',
											maxHeight: '120px',
											objectFit: 'contain',
											borderRadius: '8px',
											marginBottom: '10px',
										}}
									/>
								)}
								<Typography variant="h6">
									{meal.nombre || meal.title}
								</Typography>
								{meal.precio && !hasVariants && (
									<Typography variant="subtitle2" color="primary">
										{typeof meal.precio === 'number'
											? `$${meal.precio.toLocaleString('es-AR')}`
											: meal.precio}
									</Typography>
								)}
								{meal.descripcion && meal.descripcion.toLowerCase() !== 'sin descripción' && (
									<Typography variant="body2" color="text.secondary">
										{meal.descripcion}
									</Typography>
								)}
							</CardContent>

							{hasVariants && (
								<>
									<CardActions disableSpacing>
										<IconButton onClick={() => toggleExpand(idx)} aria-expanded={expanded} aria-label="mostrar más">
											<ExpandMoreIcon
												style={{
													transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
													transition: '0.3s',
												}}
											/>
										</IconButton>
									</CardActions>
									<Collapse in={expanded} timeout="auto" unmountOnExit>
										<CardContent>
											<Stack direction="column" spacing={1} mt={1}>
												{meal.variantes.map((v, i) => (
													<Chip
														key={i}
														label={`${v.cantidad}: $${v.precio.toLocaleString('es-AR')}`}
														size="small"
														sx={{ fontWeight: 500, backgroundColor: '#2e7d32', color: '#fff' }}
													/>
												))}
											</Stack>
											{meal.variantes?.some((v) => v.descripcion) && (
												<ul className="mt-2 space-y-1 text-xs text-gray-600">
													{meal.variantes.filter((v) => v.descripcion).map((v, i) => (
														<li key={i}>
															<strong>{v.cantidad}:</strong> {v.descripcion}
														</li>
													))}
												</ul>
											)}
										</CardContent>
									</Collapse>
								</>
							)}
						</Card>
					);
				})}
			</div>
		</section>
	);
};

export default MenuList;
