import { useCallback, useMemo, useState } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useSwipeable } from 'react-swipeable'
import {
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { Button, ModalCloseButton } from '@opengovsg/design-system-react'

import { useIsMobile } from '~hooks/useIsMobile'

import { ProgressIndicator } from '../../components/ProgressIndicator'

import { NEW_FEATURES } from './components/AnnouncementsFeatureList'
import { NewFeatureContent } from './components/NewFeatureContent'

interface RolloutAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
}

const NUM_NEW_FEATURES = NEW_FEATURES.length

export const RolloutAnnouncementModal = ({
  isOpen,
  onClose,
}: RolloutAnnouncementModalProps): JSX.Element => {
  const isMobile = useIsMobile()
  const [currActiveIdx, setCurrActiveIdx] = useState<number>(0)
  const isLastAnnouncement = useMemo(
    () => currActiveIdx === NUM_NEW_FEATURES - 1,
    [currActiveIdx],
  )

  const handleNextClick = useCallback(() => {
    if (isLastAnnouncement) {
      onClose()
      return
    }

    setCurrActiveIdx(Math.min(currActiveIdx + 1, NUM_NEW_FEATURES - 1))
  }, [currActiveIdx, isLastAnnouncement, onClose])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrActiveIdx(Math.min(currActiveIdx + 1, NUM_NEW_FEATURES - 1)),
    onSwipedRight: () => setCurrActiveIdx(Math.max(currActiveIdx - 1, 0)),
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? 'full' : 'md'}>
      <ModalOverlay />
      <ModalContent {...swipeHandlers} borderRadius="0.25rem">
        <ModalCloseButton />
        <NewFeatureContent content={NEW_FEATURES[currActiveIdx]} />
        <ModalFooter>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            width="100vw"
            alignItems={isMobile ? 'normal' : 'center'}
            justifyContent="space-between"
            spacing="2rem"
          >
            <ProgressIndicator
              numIndicators={NUM_NEW_FEATURES}
              currActiveIdx={currActiveIdx}
              onClick={setCurrActiveIdx}
            />
            <Flex gap="1rem">
              {!isMobile && (
                <Button onClick={onClose} variant="clear" colorScheme="sub">
                  Cancel
                </Button>
              )}

              {isLastAnnouncement ? (
                <Button onClick={handleNextClick} isFullWidth={isMobile}>
                  Done
                </Button>
              ) : (
                <Button
                  rightIcon={<BiRightArrowAlt size="1.5rem" />}
                  onClick={handleNextClick}
                  isFullWidth={isMobile}
                >
                  Next
                </Button>
              )}
            </Flex>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
