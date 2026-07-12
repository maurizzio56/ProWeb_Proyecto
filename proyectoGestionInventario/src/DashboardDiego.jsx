import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';
import { getDashboardResumen } from './api';

export default function DashboardDiego() {
    const [metrics, setMetrics] = useState({
        totalProductos: 0,
        stockBajo: 0,
        productosAgregadosHoy: 0,
        categorias: [
            { nombre: 'Polos', cantidad: 0, color: '#3498db' },
            { nombre: 'Pantalones', cantidad: 0, color: '#2ecc71' },
            { nombre: 'Casacas', cantidad: 0, color: '#9b59b6' },
            { nombre: 'Shorts', cantidad: 0, color: '#f1c40f' }
        ],
        alertasStock: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardResumen()
            .then(data => {
                setMetrics(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar dashboard:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="app-shell">
                <Sidebar />
                <main className="main-content">
                    <h2>Cargando dashboard...</h2>
                </main>
            </div>
        );
    }

    return (
        <div className="app-shell">
            <Sidebar />
            <main className="main-content">
                <div style={estilos.contenedor}>
                    <h2 style={estilos.tituloPrincipal}>Panel de Control e Indicadores</h2>
                    
                    <div style={estilos.bloqueTarjetas}>
                        <div style={{ ...estilos.tarjeta, ...estilos.tarjetaNormal }}>
                            <span style={estilos.numeroMetric}>{metrics.totalProductos}</span>
                            <p style={estilos.textoEtiqueta}>Modelos Registrados</p>
                        </div>
                        <div style={{ ...estilos.tarjeta, ...estilos.tarjetaAlerta }}>
                            <span style={estilos.numeroMetric}>{metrics.stockBajo}</span>
                            <p style={estilos.textoEtiqueta}>Prendas en Alerta</p>
                        </div>
                        <div style={{ ...estilos.tarjeta, ...estilos.tarjetaExito }}>
                            <span style={estilos.numeroMetric}>{metrics.productosAgregadosHoy}</span>
                            <p style={estilos.textoEtiqueta}>Actividad de Hoy</p>
                        </div>
                    </div>

                    <div style={estilos.cajaGrafico}>
                        <h3 style={estilos.subtitulo}>Distribución de Stock Físico por Categoría</h3>
                        {metrics.categorias.map((cat, index) => {
                            const maxUnidadesReferencia = 100; 
                            const porcentaje = Math.min((cat.cantidad / maxUnidadesReferencia) * 100, 100);

                            return (
                                <div key={index} style={estilos.filaBarra}>
                                    <span style={estilos.nombreEtiqueta}>{cat.nombre}</span>
                                    <div style={estilos.fondoBarra}>
                                        <div style={{ 
                                            ...estilos.rellenoBarra, 
                                            width: `${porcentaje}%`, 
                                            backgroundColor: cat.color 
                                        }} />
                                    </div>
                                    <span style={estilos.cantidadTexto}>{cat.cantidad} und</span>
                                </div>
                            );
                        })}
                    </div>

                    <div style={estilos.cajaGrafico}>
                        <h3 style={estilos.subtitulo}>Productos con Bajo Stock (Alertas Reales)</h3>
                        <table style={estilos.tabla}>
                            <thead>
                                <tr>
                                    <th style={estilos.celdaCabecera}>Producto</th>
                                    <th style={estilos.celdaCabecera}>Stock Actual</th>
                                    <th style={estilos.celdaCabecera}>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {metrics.alertasStock.length > 0 ? (
                                    metrics.alertasStock.map((item) => (
                                        <tr key={item.id}>
                                            <td style={estilos.celdaCuerpo}>{item.producto}</td>
                                            <td style={{ ...estilos.celdaCuerpo, fontWeight: 'bold', color: '#e74c3c' }}>{item.stock} und</td>
                                            <td style={estilos.celdaCuerpo}>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    backgroundColor: item.estado === 'Crítico' ? '#fde8e8' : '#fef9c3',
                                                    color: item.estado === 'Crítico' ? '#c81e1e' : '#713f12'
                                                }}>{item.estado}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ ...estilos.celdaCuerpo, color: '#666', textAlign: 'center' }}>
                                            No hay alertas. Todo el inventario tiene stock óptimo.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

const estilos = {
    contenedor: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' },
    tituloPrincipal: { color: '#2c3e50', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' },
    subtitulo: { color: '#34495e', marginBottom: '15px' },
    bloqueTarjetas: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' },
    tarjeta: { flex: '1', minWidth: '200px', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    tarjetaNormal: { borderLeft: '5px solid #3498db', backgroundColor: '#fff' },
    tarjetaAlerta: { borderLeft: '5px solid #e74c3c', backgroundColor: '#fff' },
    tarjetaExito: { borderLeft: '5px solid #2ecc71', backgroundColor: '#fff' },
    numeroMetric: { fontSize: '28px', fontWeight: 'bold', margin: '0 0 5px 0', display: 'block', color: '#333' },
    textoEtiqueta: { margin: 0, color: '#666', fontSize: '14px' },
    cajaGrafico: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' },
    filaBarra: { display: 'flex', alignItems: 'center', marginBottom: '15px' },
    nombreEtiqueta: { width: '120px', fontSize: '14px', color: '#333' },
    fondoBarra: { flex: '1', backgroundColor: '#e2e8f0', height: '20px', borderRadius: '4px', marginRight: '10px', overflow: 'hidden' },
    rellenoBarra: { height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' },
    cantidadTexto: { width: '60px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold', color: '#333' },
    tabla: { width: '100%', borderCollapse: 'collapse' },
    celdaCabecera: { backgroundColor: '#f1f5f9', padding: '10px', textAlign: 'left', borderBottom: '2px solid #cbd5e1', fontSize: '14px', color: '#475569' },
    celdaCuerpo: { padding: '12px 10px', borderBottom: '1px solid #e2e8f0', fontSize: '14px', color: '#334155' }
};