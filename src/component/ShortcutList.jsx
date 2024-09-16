import React from 'react'
import { BiDotsVertical, BiPlus } from 'react-icons/bi'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import './ShortcutListStyle.css'
import ShortcutIcon from './ShortcutIcon'

export default function ShortcutList({
    filterData, isSearching,
    handleOptions, handleEdit,
    handleDelete, handleShowForm,
}) {
    return (
        <div className="wraplist">
            <div className="listcon">
                <ul className='shortcut-list'>
                    <li className='shortcut-content-btn'>    
                        <div className='addShortcut-btn-wrap'
                            onClick={handleShowForm}
                        >
                            <div className="addShortcut-icon">
                                <BiPlus className='addShortcut-pluss-icon'/>
                            </div>
                            <div className="addShortcut-text-wrap">
                                <span className='addShortcut-text'>Add Shortcut</span>
                            </div>
                        </div>       
                    </li>

                    { isSearching ? (
                        <div className='loading-result-div'>Loading....</div>
                        ) : (
                        filterData.length > 0 && (
                        filterData.reverse().map((shortcut, index) => {
                            return(
                                <li key={index} className='shortcut-content'>
                                    <a className='link' 
                                        href={shortcut.shortcutUrl}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >                    
                                        <div className='title-icon-wrap'>
                                            <div className="icon">
                                                <ShortcutIcon shortcutTitle={shortcut.shortcutTitle} />
                                            </div>
                                        </div>
                                        <div className="title-wrap">
                                            <span className='title'>{shortcut.shortcutTitle}</span>
                                        </div>
                                    </a>
                                    <div className="date-option-wrap">
                                        <div className="date-wrap">
                                            <span className='date'>
                                            {`${shortcut.shortcutDate.month} ${shortcut.shortcutDate.date}, ${shortcut.shortcutDate.year}`}
                                            </span>
                                        </div>
                                        <div className="more-option">
                                            <BiDotsVertical 
                                                className="option-icon"
                                                onClick={() => handleOptions(shortcut.id)}
                                            />
                                        </div>
                                    </div>
                                        
                                    <ul className={`edit-delete-option 
                                        ${shortcut.showOptionsMenu ? 'show' : ''}`}
                                    >
                                        <li className='edit-wrap' onClick={() => handleEdit(shortcut.id)}>
                                            <AiFillEdit className='edit-icon'/>
                                            Edit
                                        </li>
                                        <li className='delete-wrap' onClick={() => handleDelete(shortcut.id)}>
                                            <AiFillDelete className='delete-icon'/>
                                            Delete
                                        </li>
                                    </ul>
                                </li>
                            )
                        }))
                        )
                    }
                </ul>
            </div>
        </div>
    )
}