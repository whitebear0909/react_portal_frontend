/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router'
import toast from 'react-hot-toast'
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {resendInviteNBSAdmin} from './redux/nbsAdminCRUD'
import {KTSVG} from '../../../_metronic/helpers'

type LinkCopyDlgProps = {
  link: string
  open: boolean
  onClose: () => unknown
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  inputContainer: {
    position: 'relative',
  },
  linkTextInput: {
    paddingRight: 30,
  },
  copyIcon: {
    position: 'absolute',
    right: 0,
    top: 13,
    cursor: 'pointer',
  },
}))
const InviteLinkCopyDialog: React.FC<LinkCopyDlgProps> = ({link, open, onClose}) => {
  const classes = useStyles()
  const [copied, setCopied] = useState(false)
  const handleClose = (event: object, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return
    }

    onClose()
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='sm'>
      <DialogTitle id='form-dialog-title'>Copy invite link</DialogTitle>
      <DialogContent>
        <DialogContentText>Please use the following link to invite the customer.</DialogContentText>
        <div className={classes.inputContainer}>
          <TextField
            autoFocus
            margin='dense'
            fullWidth
            value={link}
            className={classes.linkTextInput}
          />
          <div className={classes.copyIcon} onClick={handleCopy}>
            <KTSVG
              path={
                copied
                  ? '/media/icons/duotone/Code/Done-circle.svg'
                  : '/media/icons/duotone/General/Copy.svg'
              }
              className='svg-icon-2 svg-icon-primary d-block'
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onClose} color='primary'>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ResendInviteNBSAdmin() {
  const {id}: any = useParams()
  const history = useHistory()
  const classes = useStyles()
  const [inviteLink, setInviteLink] = useState('')
  const [dlgOpen, setDlgOpen] = useState(false)

  useEffect(() => {
    resendInviteNBSAdmin(id)
      ?.then(({data}) => {
        toast.success(data.message)
        setInviteLink(data.link)
        setDlgOpen(true)
      })
      .catch(() => toast.error('Failed to resend the invite'))
  }, [])

  const handleClose = () => {
    setDlgOpen(false)
    history.push('/dashboard')
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={!dlgOpen}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <InviteLinkCopyDialog link={inviteLink} open={dlgOpen} onClose={handleClose} />
    </>
  )
}

export default ResendInviteNBSAdmin
