import { Box, Flex, Stack } from '@chakra-ui/react'

import { FormColorTheme, FormDto } from '~shared/types/form'

import { SubmissionData } from '~features/public-form/PublicFormContext'

import { PaymentsThankYouSvgr } from '../../../../../components/FormEndPage/PaymentsThankYouSvgr'
import { PaymentEndPageBlock } from '../../../../admin-form/create/end-page/PaymentEndPageBlock'

import { FeedbackBlock, FeedbackFormInput } from './FeedbackBlock'

export interface PaymentEndPagePreviewProps {
  endPage: FormDto['endPage']
  submissionData: SubmissionData
  handleSubmitFeedback: (inputs: FeedbackFormInput) => void
  isFeedbackSubmitted: boolean
  colorTheme: FormColorTheme
}

export const PaymentEndPagePreview = ({
  handleSubmitFeedback,
  isFeedbackSubmitted,
  colorTheme,
  ...endPageProps
}: PaymentEndPagePreviewProps): JSX.Element => {
  return (
    <>
      <Flex flexDir="column" align="center">
        <Box mt={{ base: '2.5rem', md: 0 }} mb={{ base: '0.5rem', md: 0 }}>
          <PaymentsThankYouSvgr h="100%" />
        </Box>
        <Stack
          pt={{ base: '1rem', md: '1.5rem' }}
          px={{ base: '1rem', md: '4rem' }}
          bg="transparent"
          w="100%"
        >
          <PaymentEndPageBlock focusOnMount {...endPageProps} />
          {isFeedbackSubmitted ? null : (
            <Box
              backgroundColor="white"
              p="2rem"
              py={{ base: '1.5rem', md: '2rem' }}
              px={{ base: '1rem', md: '2rem' }}
            >
              <FeedbackBlock onSubmit={handleSubmitFeedback} />
            </Box>
          )}
        </Stack>
      </Flex>
    </>
  )
}
