import React from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap-v5'
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import SVG from 'react-inlinesvg'

import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const HistoryModal = ({show, onHide, quoteId, quotes}) => {
  const actions = quotes.find((q) => q.dbkey === quoteId).action || []

  return (
    <Modal size='lg' show={show} onHide={onHide} aria-labelledby='example-modal-sizes-title-lg'>
      <Modal.Header>
        <Modal.Title>Actions history</Modal.Title>
      </Modal.Header>
      <Modal.Body className='overlay overlay-block cursor-default'>
        <List>
          {actions.map((action) => (
            <>
              <Divider component='li' />
              <ListItem>
                <ListItemText primary={action.action.toUpperCase()} secondary={action.comment} />
                {!!action.attachment && (
                  <a href={`${process.env.REACT_APP_PUBLIC_URL}/documents/${action.attachment}`}>
                    <span className='svg-icon svg-icon-md svg-icon-info'>
                      <SVG
                        src={toAbsoluteUrl('/media/svg/icons/Files/Download.svg')}
                        title='Reject'
                      />
                    </span>
                  </a>
                )}
              </ListItem>
            </>
          ))}
          <Divider component='li' />
        </List>
      </Modal.Body>
      <Modal.Footer>
        <button type='button' onClick={onHide} className='btn btn-light btn-elevate'>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStatesToProps = (state) => ({
  quotes: state.quotes.quotes,
})

export default connect(mapStatesToProps)(HistoryModal)
