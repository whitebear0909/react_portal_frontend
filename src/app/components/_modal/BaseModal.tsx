import React from 'react'
import {Modal} from 'react-bootstrap-v5'

type ModalProps = {
    id: string
    title: string
    content: string
    okText: string
    cancelText: string    
    loading: boolean
    show: boolean
    handleOk: () => void
    handleCancel: () => void
}

const BaseModal: React.FC<ModalProps> = ({id, title, content, okText, cancelText, loading, show, handleOk, handleCancel}) => {
    return (
        <Modal 
            className="modal fade" 
            id={"kt_base_modal_" + id} 
            tabIndex={-1}
            show={show}
            aria-hidden="true"
            centered
        >
            <div className="modal-dialog modal-dialog-centered mw-650px my-0">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{title}</h2>
                        <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal" onClick={handleCancel}>
                            <span className="svg-icon svg-icon-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black"></rect>
                                    <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black"></rect>
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
                        <div className="text-center">
                            <label className="fs-2 fw-bold form-label">{content}</label>
                        </div>
                        <div className="text-center pt-15">
                            <button type="button" id={"kt_base_modal_" + id + "cancel"} className="btn btn-light me-3" onClick={handleCancel}>{cancelText}</button>
                            <button type="button" id={"kt_base_modal_" + id + "submit"} className="btn btn-primary" onClick={handleOk} disabled={loading}>
                                {!loading ? (
                                        <span className="indicator-label">{okText}</span>
                                    ) : (
                                        <span className="indicator-label">
                                            Please wait... 
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                        </span>
                                    )
                                }                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default BaseModal