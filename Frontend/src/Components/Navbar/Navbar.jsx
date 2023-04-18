import React, { useEffect } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { fetchUserName } from '../../store/user-actions';
import { tokenFunc } from '../../store/auth-actions';
const Navbar = (props) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const dispatch = useDispatch()
    const [anchorElUser, setAnchorElUser] = useState(null);
    const isAdm = useSelector((state) => state.auth.isAdmin)
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const data = useSelector((state) => state.auth.data)
    const [flag, setFlag] = useState(1);
    const fireLogout = () => {
        props.onFireLogout(true)
    };
    const goToAdmin = () => {
        navigate('/admin')
    }
    const goToProfile = () => {
        navigate('/profile')
    }
    const goToMain = () => {
        navigate('/')
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    useEffect(() => {
        dispatch(tokenFunc())
    })
    useEffect(() => {
        dispatch(fetchUserName())
    }, [])
    return (
        // <div className="navbar">
        //     <div className="left" onClick={goToMain}>
        //         <img src='/assets/logo.svg' alt='logo' />
        //         <p>PET</p>
        //     </div>
        //     <div className="center">
        //         <div className='list'>
        //             <p>About Us</p>
        //             <p>Adopt</p>
        //             <p>Donate</p>
        //             <p>Resources</p>
        //             {isAdm ? <button onClick={goToAdmin}>Admin</button> : ""}
        //         </div>
        //     </div>
        //     <div className="right">
        //         <button onClick={fireLogout}>Logout</button>

        //     </div>
        // </div>
        <AppBar
            position="static"
            style={{ background: "transparent", boxShadow: "none", }}
        >
            <Container style={{ maxWidth: "100vw", paddingLeft: 0, paddingRight: 0 }}>
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={goToMain}
                        style={{ color: "black", fontWeight: "500" }}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            cursor: "pointer",
                            textDecoration: "none"
                        }}
                    >
                        <img src='/assets/logo.svg' alt='' />
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500", }}
                                >
                                    About Us
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500", }}
                                >
                                    Adopt
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500", }}
                                >
                                    Donate
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500", }}
                                >
                                    Resources
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500", }}
                                >
                                    Favourites
                                </Typography>
                            </MenuItem>
                            {isAdm ?
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography onClick={goToAdmin}
                                        textAlign="center"
                                        style={{ color: "black", fontWeight: "500", }}
                                    >
                                        Admin
                                    </Typography>
                                </MenuItem>
                                : ''}


                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={goToMain}
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "roboto",
                            textDecoration: "none",
                            cursor: "pointer",
                            color: 'black'
                        }}
                    >
                        <img src='/assets/logo.svg' alt='' />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ color: 'black', fontWeight: '500' }}
                        >
                            About Us
                        </Button>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ color: 'black', fontWeight: '500' }}
                        >
                            Adopt
                        </Button>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ color: 'black', fontWeight: '500' }}
                        >
                            Donate
                        </Button>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ color: 'black', fontWeight: '500' }}
                        >
                            Resources
                        </Button>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            style={{ color: 'black', fontWeight: '500' }}
                        >
                            Favourites
                        </Button>
                        {isAdm ?
                            <Button
                                onClick={handleCloseNavMenu}
                                href='/admin'
                                sx={{ my: 2, color: "white", display: "block" }}
                                style={{ color: 'black', fontWeight: '500' }}
                            >
                                Admin
                            </Button>
                            : <></>}
                    </Box>

                    <p style={{ color: "black", marginRight: "1vw", fontWeight: "Bold" }}>{data.name}</p>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <PersonIcon sx={{ fontSize: 30, color: 'black' }} />
                                <ArrowDropDownIcon sx={{ fontSize: 20, color: 'black' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={goToProfile}
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500" }}
                                >
                                    Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography onClick={fireLogout}
                                    textAlign="center"
                                    style={{ color: "black", fontWeight: "500" }}
                                >
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

        </AppBar>
    )
}

export default Navbar