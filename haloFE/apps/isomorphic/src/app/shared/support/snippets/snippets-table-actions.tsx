'use client';

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Popover,
  Text,
  Title,
  Tooltip,
} from 'rizzui';
import PencilIcon from '@core/components/icons/pencil';
import TrashIcon from '@core/components/icons/trash';
import { PiWarning } from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import { SnippetsAndTemplatesDataType } from './table';
import CreateSnippetTemplateForm from '../create-snippet-template-from';

export function SnippetsTableActions({
  row,
  onDelete,
}: {
  row?: SnippetsAndTemplatesDataType;
  onDelete?: () => void;
}) {
  const { openModal } = useModal();
  return (
    <Flex align="center" justify="end" gap="3" className="pe-4">
      <Tooltip
        size="sm"
        content={'View/Edit snippet'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() =>
            openModal({
              view: (
                <CreateSnippetTemplateForm
                  type="Edit"
                  title="snippet"
                  data={row}
                />
              ),
              customSize: 850,
            })
          }
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <Popover placement="left">
        <Popover.Trigger>
          <ActionIcon size="sm" variant="outline">
            <TrashIcon className="h-4 w-4" />
          </ActionIcon>
        </Popover.Trigger>
        <Popover.Content className="!z-0">
          {({ setOpen }) => (
            <Box className="w-56 pb-2 pt-1 text-left rtl:text-right">
              <Title
                as="h6"
                className="mb-0.5 flex items-start text-sm sm:items-center"
              >
                <PiWarning className="text me-2 size-6" /> Delete snippet!
              </Title>
              <Text className="mt-2 leading-relaxed">
                Are you sure you want to delete this snippet?
              </Text>
              <Flex align="center" justify="end" className="mt-2 gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7"
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>
                <Button
                  size="sm"
                  className="h-7"
                  onClick={() => {
                    onDelete?.();
                    setOpen(false);
                  }}
                >
                  Yes
                </Button>
              </Flex>
            </Box>
          )}
        </Popover.Content>
      </Popover>
    </Flex>
  );
}
