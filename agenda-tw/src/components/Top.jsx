import { XMarkIcon } from '@heroicons/react/20/solid'

const Top = () => {
    return (
        <div className="bg-gray-900">
            <div className='mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8 text-sm text-white'>
            <div className="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5">
                ← Portal PUCMM
                </a>
            </div>
            <ul className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-2'>
                <li>Biblioteca</li>
                <li>Mi Campus</li>
                <li>PVA</li>
                <li>Correo</li>
                <li>Calendario</li>
                <li>Graduación</li>
                <li>Prensa</li>
                <li>Agenda</li>
            </ul>
            </div>
        </div>
    )
}

export default Top;