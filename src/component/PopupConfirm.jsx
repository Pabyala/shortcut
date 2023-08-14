import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './PopupConfirmStyle.css'

export default function PopupConfirm({
    modalShow, handleNoConfirm, 
    handleYesConfirm
}) {
    return (
        <Modal
            show={modalShow} 
            onHide={handleNoConfirm}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Confirmation
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className='confirm-text'>
                    Are you sure you want to delete this shortcut? 
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleNoConfirm} className='btn-no'>No</Button>
                <Button onClick={handleYesConfirm} className='btn-yes'>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}
