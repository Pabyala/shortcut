import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './PopupFormStyle.css'

export default function PopupForm({
    show, handleClose, handleSave, errorInput,
    title, setTitle, url, setUrl, formMode,
    handleSaveEdit, isUrlValid
}) {
    return (
        <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} 
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {formMode === 'Add' ? 'Add new shortcut' : 'Edit shortcut'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='form-input-title'>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your title"
                            className='form-input'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="error-message">
                            {errorInput && title <= 0 ? ( 
                                <span className='popup-error-message'>Title can't be empty</span> 
                                ) : ("")
                            }
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='form-input-title'>URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your url"
                            className='form-input'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <div className="error-message">
                            {errorInput && url <= 0 ? ( 
                                <span className='popup-error-message'>Url can't be empty</span> 
                                ) : isUrlValid ? (
                                <span className='popup-error-message'>Ivalid url</span>
                                ) : ("")
                            }
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='btn-save-wrap'>
            <Button 
                variant="primary" 
                onClick={formMode === 'Add' ? handleSave : handleSaveEdit}
                className='btn-save'
            >
                Save
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
