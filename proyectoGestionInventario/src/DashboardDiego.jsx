import React, { useState } from 'react';

export default function DashboardDiego() {
    
    const [datosDashboard, setDatosDashboard] = useState({
        totalProductos: 145,
        stockBajo: 8,
        movimientosHoy: 32,
        
        actividad: [
            { dia: 'Lunes', entradas: 12, salidas: 7 },
            { dia: 'Martes', entradas: 19, salidas: 15 },
            { dia: 'Miércoles', entradas: 8, salidas: 12 },
            { dia: 'Jueves', entradas: 15, salidas: 9 },
            { dia: 'Viernes', entradas: 22, salidas: 14 }
        ],
        
        categorias: [
            { nombre: 'Electrónica', cantidad: 45, color: '#3498db' },
            { nombre: 'Lácteos', cantidad: 28, color: '#2ecc71' },
            { nombre: 'Limpieza', cantidad: 35, color: '#9b59b6' },
            { nombre: 'Bebidas', cantidad: 37, color: '#f1c40f' }
        ]
    });

    
    const estilos = {
        contenedor: { padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' },
        tituloPrincipal: { color: '#2c3e50', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '20px' },
        bloqueTarjetas: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '30px' },
        tarjeta: { flex: '1', minWidth: '200px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #3498db' },
        tarjetaAlerta: { borderLeft: '5px solid #e74c3c' },
        tarjetaExito: { borderLeft: '5px solid #2ecc71' },
        numeroMetric: { fontSize: '28px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#333' },
        bloqueEstadisticas: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
        cajaGrafico: { flex: '1', minWidth: '300px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
        filaBarra: { display: 'flex', alignItems: 'center', marginBottom: '15px' },
        nombreEtiqueta: { width: '90px', fontSize: '14px' },
        fondoBarra: { flex: '1', backgroundColor: '#e2e8f0', height: '20px', borderRadius: '4px', marginRight: '10px', overflow: 'hidden' },
        tabla: { width: '100%', borderCollapse: 'collapse' },
        celdaCabecera: { backgroundColor: '#f1f5f9', padding: '10px', textAlign: 'left', borderBottom: '2px solid #cbd5e1' },
        celdaCuerpo: { padding: '10px', borderBottom: '1px solid #e2e8f0' }
    };

    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.tituloPrincipal}>📊 Panel de Control e Indicadores</h2>

            {/* REQ. 3: Indicadores Clave del Panel Principal */}
            <div style={estilos.bloqueTarjetas}>
                <div style={estilos.tarjeta}>
                    <p style={{ margin: 0, color: '#7f8c8d', fontSize: '12px', fontWeight: 'bold' }}>TOTAL DE PRODUCTOS</p>
                    <p style={estilos.numeroMetric}>{datosDashboard.totalProductos}</p>
                </div>

                <div style={{ ...estilos.tarjeta, ...estilos.tarjetaAlerta }}>
                    <p style={{ margin: 0, color: '#7f8c8d', fontSize: '12px', fontWeight: 'bold' }}>PRODUCTOS STOCK BAJO</p>
                    <p style={estilos.numeroMetric}>{datosDashboard.stockBajo} ⚠️</p>
                </div>

                <div style={{ ...estilos.tarjeta, ...estilos.tarjetaExito }}>
                    <p style={{ margin: 0, color: '#7f8c8d', fontSize: '12px', fontWeight: 'bold' }}>MOVIMIENTOS DE HOY</p>
                    <p style={estilos.numeroMetric}>{datosDashboard.movimientosHoy}</p>
                </div>
            </div>

            {/* REQ. 4: Visualizaciones Gráficas y Estadísticas Básicas en HTML/CSS */}
            <div style={estilos.bloqueEstadisticas}>

                {/* Gráfico de barras visuales con divs nativos */}
                <div style={estilos.cajaGrafico}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50', fontSize: '16px' }}>Monitoreo de Stock por Categoría</h3>
                    <div style={{ marginTop: '20px' }}>
                        {datosDashboard.categorias.map((cat, index) => (
                            <div key={index} style={estilos.filaBarra}>
                                <span style={estilos.nombreEtiqueta}>{cat.nombre}</span>
                                <div style={estilos.fondoBarra}>
                                    <div style={{ width: `${(cat.cantidad / 50) * 100}%`, backgroundColor: cat.color, height: '100%' }}></div>
                                </div>
                                <span style={{ fontWeight: 'bold' }}>{cat.cantidad}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resumen estadístico mediante una tabla limpia */}
                <div style={estilos.cajaGrafico}>
                    <h3 style={{ marginTop: 0, color: '#2c3e50', fontSize: '16px' }}>Resumen de Actividad Operativa</h3>
                    <table style={estilos.tabla}>
                        <thead>
                            <tr>
                                <th style={estilos.celdaCabecera}>Día</th>
                                <th style={estilos.celdaCabecera}>Entradas</th>
                                <th style={estilos.celdaCabecera}>Salidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosDashboard.actividad.map((act, index) => (
                                <tr key={index}>
                                    <td style={estilos.celdaCuerpo}><strong>{act.dia}</strong></td>
                                    <td style={{ ...estilos.celdaCuerpo, color: '#2ecc71' }}>+{act.entradas} u.</td>
                                    <td style={{ ...estilos.celdaCuerpo, color: '#e74c3c' }}>-{act.salidas} u.</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}