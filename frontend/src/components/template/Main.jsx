import './Main.css'
import React from 'react'
import Header from './Header'

export default props =>
    <React.Fragment>
        {/* Propriedades recebidas no Main estão sendo propagadas para o Header (ícone, título e subtítulo) */}
        <Header {...props} />
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>