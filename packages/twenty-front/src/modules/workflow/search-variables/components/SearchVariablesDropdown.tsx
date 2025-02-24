import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { DropdownMenu } from '@/ui/layout/dropdown/components/DropdownMenu';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { StyledDropdownButtonContainer } from '@/ui/layout/dropdown/components/StyledDropdownButtonContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { SearchVariablesDropdownStepItem } from '@/workflow/search-variables/components/SearchVariablesDropdownStepItem';
import SearchVariablesDropdownStepSubItem from '@/workflow/search-variables/components/SearchVariablesDropdownStepSubItem';
import { SEARCH_VARIABLES_DROPDOWN_ID } from '@/workflow/search-variables/constants/SearchVariablesDropdownId';
import { StepOutputSchema } from '@/workflow/search-variables/types/StepOutputSchema';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { IconVariable } from 'twenty-ui';
import { useAvailableVariablesInWorkflowStep } from '@/workflow/hooks/useAvailableVariablesInWorkflowStep';

const StyledDropdownVariableButtonContainer = styled(
  StyledDropdownButtonContainer,
)`
  background-color: ${({ theme }) => theme.background.transparent.lighter};
  color: ${({ theme }) => theme.font.color.tertiary};
  padding: ${({ theme }) => theme.spacing(0)};
  margin: ${({ theme }) => theme.spacing(2)};
`;

const SearchVariablesDropdown = ({
  inputId,
  editor,
}: {
  inputId: string;
  editor: Editor;
}) => {
  const theme = useTheme();

  const dropdownId = `${SEARCH_VARIABLES_DROPDOWN_ID}-${inputId}`;
  const { isDropdownOpen } = useDropdown(dropdownId);
  const availableVariablesInWorkflowStep =
    useAvailableVariablesInWorkflowStep();

  const [selectedStep, setSelectedStep] = useState<
    StepOutputSchema | undefined
  >(undefined);

  const insertVariableTag = (variable: string) => {
    editor.commands.insertVariableTag(variable);
  };

  const handleStepSelect = (stepId: string) => {
    setSelectedStep(
      availableVariablesInWorkflowStep.find((step) => step.id === stepId),
    );
  };

  const handleSubItemSelect = (subItem: string) => {
    insertVariableTag(subItem);
  };

  const handleBack = () => {
    setSelectedStep(undefined);
  };

  return (
    <Dropdown
      dropdownId={dropdownId}
      dropdownHotkeyScope={{
        scope: dropdownId,
      }}
      clickableComponent={
        <StyledDropdownVariableButtonContainer isUnfolded={isDropdownOpen}>
          <IconVariable size={theme.icon.size.sm} />
        </StyledDropdownVariableButtonContainer>
      }
      dropdownComponents={
        <DropdownMenu>
          <DropdownMenuItemsContainer>
            {selectedStep ? (
              <SearchVariablesDropdownStepSubItem
                step={selectedStep}
                onSelect={handleSubItemSelect}
                onBack={handleBack}
              />
            ) : (
              <SearchVariablesDropdownStepItem
                steps={availableVariablesInWorkflowStep}
                onSelect={handleStepSelect}
              />
            )}
          </DropdownMenuItemsContainer>
        </DropdownMenu>
      }
      dropdownPlacement="bottom-end"
      dropdownOffset={{ x: 0, y: 4 }}
    />
  );
};

export default SearchVariablesDropdown;
