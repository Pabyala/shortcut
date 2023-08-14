import React, { useEffect, useState } from 'react'
import PopupConfirm from './PopupConfirm';
import PopupForm from './PopupForm';
import './MainStyle.css'
import { AiOutlineSearch } from 'react-icons/ai'
import ShortcutList from './ShortcutList';

const months = ["January", "February", "March", "April", "May", "June", "July", 
                "August", "September", "October", "November", "December"]

export default function Main() {
    const [modalShow, setModalShow] = useState(false);
    const [showPopupForm, setShowPopupForm] = useState(false);
    const [errorInput, setErrorInput] = useState(false);
    const [isUrlValid, setIsUrlValid] = useState(false)
    const [shortcuts, setShortcuts] = useState(() => {
        const localValue = localStorage.getItem("SHORTCUT")
        if(localValue === null) return []
        return JSON.parse(localValue) 
    })
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [selectedShortcutId, setSelectedShortcutId] = useState(null);
    const [formMode, setFormMode] = useState('Add')
    const [inputTextSearch, setInputTextSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false)

    //save to localStorage everytime you changed the shortcuts
    useEffect(() => {
        localStorage.setItem("SHORTCUT", JSON.stringify(shortcuts));
    }, [shortcuts])

    //show the form
    const handleShowForm = () => {
        setShowPopupForm(true);
        setShortcuts((currentShortcut) => {
            return currentShortcut.map((shortcut) => {
                return {
                    ...shortcut, showOptionsMenu: false
                }
            })
        })
    };

    function isHttpValid(str) {
        try {
          const newUrl = new URL(str);
          return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (err) {
          return false;
        }
    }
    //save the form to shortcut and localStorage
    const handleSave = () => {

        if (title.length === 0 || url.length === 0) {
          setErrorInput(true);
          return;
        } 
        else if(!isHttpValid(url)){
            setIsUrlValid(true);
            return;
        }

        const dateObject = new Date();
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth();
        const dateToday = dateObject.getDate();

        setShortcuts(currentShortcut => {
            return [
                ...currentShortcut, {
                    id: crypto.randomUUID(),
                    shortcutTitle: title,
                    shortcutUrl: url,
                    shortcutDate: {
                        year: year,
                        month: months[month],
                        date: dateToday,
                    },
                    showOptionsMenu: false,
                }

            ]
        })
    
        setTitle('');
        setUrl('');
        setShowPopupForm(false);
        setErrorInput(false);
        setIsUrlValid(false);
    };

    //close the form (click the x icon)
    const handleClose = () => {
        setShowPopupForm(false);
        setTitle('');
        setUrl('');
        setErrorInput(false);
        setIsUrlValid(false);
        setFormMode('Add')
    };

    //show the edit and delete option
    const handleOptions = (id) => {
        setSelectedShortcutId(id)
        setShortcuts((currentShortcut) => {
            return currentShortcut.map((shortcut) => {
                if (shortcut.id === id){
                    return {
                        ...shortcut,
                        showOptionsMenu: !shortcut.showOptionsMenu,
                    }
                }
                return { ...shortcut, showOptionsMenu: false}
            })
        })
    }

    //show the selected shortcut and edit/update it 
    const handleEdit = (id) => {
        const selectedShortcutEdit = shortcuts.find((shortcut) => shortcut.id === id)

        if(selectedShortcutEdit){
            setTitle(selectedShortcutEdit.shortcutTitle)
            setUrl(selectedShortcutEdit.shortcutUrl)
            setSelectedShortcutId(id)
            setFormMode('Edit')
            setShowPopupForm(true)
            
        }
    }

    //save the shortcut that you edit/update 
    const handleSaveEdit = () => {

        if (title.length === 0 || url.length === 0) {
            setErrorInput(true);
            return;
          } else if(!isHttpValid(url)){
              setIsUrlValid(true);
              return;
        }

        const dateObject = new Date();
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth();
        const dateToday = dateObject.getDate();

        setShortcuts((currentShortcut) => {
            return currentShortcut.map((shortcut) => {
                if(shortcut.id === selectedShortcutId)
                return {
                    ...shortcut,
                    shortcutTitle: title,
                    shortcutUrl: url,
                    shortcutDate: {
                        year: year,
                        month: months[month],
                        date: dateToday,
                    },
                    showOptionsMenu: false
                }
                return shortcut
            })
        })

        setTitle('')
        setUrl('')
        setShowPopupForm(false)
    }

    //show the popup message YES/NO
    const handleDelete = (id) => {
        setModalShow(true)
        setSelectedShortcutId(id)
        setShortcuts((currentShortcut) => {
            return currentShortcut.map((shortcuts) => {
                return { ...shortcuts, showOptionsMenu: false }
            })
        })
    }

    //YES, delete the selected shortcut
    const handleYesConfirm = () => {
        setShortcuts((currentShortcut) => {
            return currentShortcut.filter((shortcuts => shortcuts.id !== selectedShortcutId))
        })
        setModalShow(false)
    }

    //NO, cancel the delete
    const handleNoConfirm = () => {
        setModalShow(false)
        setFormMode('Add')
    }

    //filter the shortcuts array base on the inputTextSearch value
    const filterData = shortcuts.filter((letter) => {
        if(inputTextSearch === ''){
            return true
        } else {
            return letter.shortcutTitle.toLowerCase().includes(inputTextSearch)

        }
    })

    //to show the loading if the user put something value in the inputTextSearch
    useEffect(() => {
        if(inputTextSearch === ''){
            setIsSearching(false)
        } else {
            setIsSearching(true)
            const timeoutLoading = setTimeout(() => {
             setIsSearching(false)   
            }, 1000)

            return () => clearTimeout(timeoutLoading)
        }
    }, [inputTextSearch])


    return (
        <div className='main'>
            <div className="main-wrap">
                <h1 className='main-title'>Google Shortcut</h1>
                <form className="input-search-wrap">
                    <input className='input-searh' 
                        type="text"
                        placeholder='Searh shortcut'
                        onChange={(e) => setInputTextSearch(e.target.value)}
                    />
                    <button className='add-icon-wrap'>
                        <AiOutlineSearch className='add-icon'/>
                    </button>
                </form>

                <PopupForm
                    show={showPopupForm}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    errorInput={errorInput}
                    title={title}
                    setTitle={setTitle}
                    url={url}
                    setUrl={setUrl}

                    formMode={formMode}
                    handleSaveEdit={handleSaveEdit}
                    isUrlValid={isUrlValid}
                />

                <PopupConfirm
                    modalShow={modalShow}
                    handleNoConfirm={handleNoConfirm}
                    handleYesConfirm={handleYesConfirm}
                />    

                <div className='shortcut-list-con'>
                    <ShortcutList
                        handleOptions={handleOptions}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleShowForm={handleShowForm}

                        filterData={filterData}
                        isSearching={isSearching}
                    />
                </div>
            </div>      
        </div>
    )
}

