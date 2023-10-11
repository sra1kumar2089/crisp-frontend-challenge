import './Modal.css';
import React from 'react';


//generic modal dialog
const Modal = (values: { handleClose: any, show: boolean, children: any, title: string }) => {
    const showHideClassName = values.show ? "modal display-block main" : "modal display-none main";

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <div className='w-full'>
                    <div className="pt-3 text-center text-2xl">
                        {values.title}
                        <button type="button"
                            onClick={values.handleClose}
                            className="text-white float-right bg-black text-xs font-medium text-center rounded-lg px-2 py-1 mr-2 mb-1 ">Close</button>

                    </div>
                </div>
                <div className='mt-5 float-left pl-2 text-lg mb-10 w-full'>
                    {values.children}
                </div>
            </div>
        </div>
    );
};

export default Modal;