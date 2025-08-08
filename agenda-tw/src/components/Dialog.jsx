import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

const Dialog = ({
    title = 'Notification',
    description = '',
    linkText = '',
    linkHref = '',
    buttons = [],
    messageOnly = false,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (messageOnly) setIsOpen(true)
    }, [messageOnly])

    const close = () => setIsOpen(false)

    return (
        <>
            {!messageOnly && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 rounded text-white text-sm p-2 hover:bg-blue-600"
                >
                    Open dialog
                </button>
            )}

            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="relative isolate bg-gray-50 rounded-lg px-6 py-4 max-w-2xl w-full shadow-xl">
                                <div
                                    aria-hidden="true"
                                    className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                                >
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                                        }}
                                        className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                                    />
                                </div>
                                <div
                                    aria-hidden="true"
                                    className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                                >
                                    <div
                                        style={{
                                            clipPath:
                                                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                                        }}
                                        className="aspect-[577/310] w-[36rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <Dialog.Title className="text-lg font-semibold text-gray-900">
                                        {title}
                                    </Dialog.Title>

                                    {description && (
                                        <>
                                            <svg
                                                viewBox="0 0 2 2"
                                                aria-hidden="true"
                                                className="mx-2 inline size-0.5 fill-current text-gray-400"
                                            >
                                                <circle r={1} cx={1} cy={1} />
                                            </svg>

                                            <Dialog.Description className="text-sm text-gray-600">
                                                {description}
                                            </Dialog.Description>
                                        </>
                                    )}

                                    {linkText && linkHref && (
                                        <a
                                            href={linkHref}
                                            className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                        >
                                            {linkText} <span aria-hidden="true">&rarr;</span>
                                        </a>
                                    )}
                                </div>

                                <div className="mt-4 flex justify-end gap-2 flex-wrap">
                                    {buttons.map((btn, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                if (btn.onClick) btn.onClick()
                                                close()
                                            }}
                                            className={`text-sm rounded px-3 py-1 ${btn.variant === 'danger'
                                                ? 'text-red-600 hover:text-red-800'
                                                : 'text-gray-600 hover:text-gray-800'
                                                }`}
                                        >
                                            {btn.text}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={close}
                                        className="-m-1.5 p-1.5 rounded text-gray-500 hover:text-gray-700"
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Dialog;

/**
 * <Notify
        title="Éxito"
        description="Tu cuenta ha sido creada correctamente."
        linkText="Ver cuenta"
        linkHref="/mi-cuenta"
        buttons={[
          { text: 'Cerrar' },
          { text: 'Eliminar', variant: 'danger', onClick: () => alert('Eliminado') },
        ]}
      />

      Sin boton

      <Notify
  messageOnly
  title="Mantenimiento programado"
  description="El sistema estará fuera de línea el sábado de 8:00 a.m. a 12:00 p.m."
  buttons={[{ text: 'Entendido' }]}
/>

 */