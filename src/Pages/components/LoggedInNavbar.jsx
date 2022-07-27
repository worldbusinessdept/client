import React from "react";
import "../../css/Navbar.css"

import { Link} from "react-router-dom";

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';





export default function LoggedInNavbar() {




    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);









    return (
        <div className="navbar">

            <div className="navbarLogo" >
                <Link to="/" >

                    <img src="https://swiftbusinesspay.site/wp-content/uploads/2021/10/PicsArt_09-24-01.22.38-scaled-1.jpg" alt="Logo" />
                </Link>
            </div>
            <div className="links" >
                <div>
                    <div>
                        <p
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                        >
                            <i class="fas fa-bars" />
                        </p>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                        >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                <MenuItem onClick={handleClose}><Link to="/account" style={{"color":"black"}}>My Account</Link></MenuItem>
                                                <MenuItem onClick={handleClose}><Link to="/withdrawal" style={{"color":"black"}}>Withdrawal</Link></MenuItem>
                                                <MenuItem onClick={handleClose}><Link to="/card" style={{"color":"black"}}>Active Cards</Link></MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
                {/* <div>
                    <Link to="/">
                        <p href="#" onClick={() => {
                            localStorage.clear();
                            history.push("/");
                            window.location.reload();

                        }} >Logout</p>
                    </Link>
                </div>
                <div>
                    <Link to="/" >
                        <p href=""><i class="fas fa-wallet" /> $0.00</p>
                    </Link>
                </div> */}
            </div>
        </div>
    );
}