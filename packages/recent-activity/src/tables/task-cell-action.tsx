import { Button } from '../components/ui/button';
import { TaskFormValues } from '../forms/taskSchema';
import { useToast } from '../components/ui/use-toast';
import { put } from '@aws-amplify/api-rest';

interface CellActionProps {
    data: TaskFormValues;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const { toast } = useToast();

    const handleStatusChange = async (newStatus: 'pending' | 'in_progress' | 'completed') => {
        try {
            let operation = put({
                apiName: 'ComplianceAPI',
                path: `/tasks/${data.id}`,
                options: {
                    body: { status: newStatus }
                }
            });
            await operation.response;
            toast({
                title: 'Success',
                description: 'Task status updated successfully.',
            });
        } catch (error) {
            console.error('Error updating task status:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to update task status.',
            });
        }
    };

    return (
        <Button onClick={() => handleStatusChange('completed')}>
            Mark as Complete
        </Button>
    );
};