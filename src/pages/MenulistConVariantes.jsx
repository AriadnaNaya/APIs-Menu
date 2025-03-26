import React from 'react';
import { sushiCombinado } from '../../sushiCombinado';
import { townKitchen } from '../../townKitchen';

const MenulistConVariantes = ({ tipo }) => {
    const data = tipo === 'sushiCombinado' ? sushiCombinado : townKitchen;

    return (
        <section className="subcategory-section">
            <h2 className="subcategory-title">
                {tipo === 'sushiCombinado' ? 'Sushi Combinado' : 'Town Kitchen'}
            </h2>

            <div className="meal-container">
                {data.map((item, idx) => (
                    <div key={item.id} className="meal-card">
                        <img
                            src={item.img || "https://via.placeholder.com/80"}
                            alt={item.title}
                            className="meal-image"
                        />
                        <div className="meal-info">
                            <div className="meal-header">
                                <span className="meal-title">{item.nombre}</span>
                                {item.precio && (
                                    <span className="meal-price">
                    ${item.precio.toLocaleString('es-AR')}
                  </span>
                                )}
                            </div>

                            {item.descripcion && (
                                <p className="meal-description">{item.descripcion}</p>
                            )}

                            {item.variantes && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {item.variantes.map((v, i) => (
                                        <div
                                            key={i}
                                            className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold"
                                        >
                                            {v.cantidad}: ${v.precio.toLocaleString('es-AR')}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item.variantes?.some((v) => v.descripcion) && (
                                <ul className="mt-2 space-y-1 text-xs text-gray-600">
                                    {item.variantes
                                        .filter((v) => v.descripcion)
                                        .map((v, i) => (
                                            <li key={i}>
                                                <span className="font-semibold">{v.cantidad}:</span>{' '}
                                                {v.descripcion}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MenulistConVariantes;
