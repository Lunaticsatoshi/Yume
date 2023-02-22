import { ReactNode } from 'react';
import { Spinner } from '@chakra-ui/react';
import classNames from 'src/utils/classnames';

interface IActionButton {
  children: ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}
interface IJoinButton {
  className?: string;
  onClick: () => void;
  isJoined: boolean;
  loading: boolean;
}

const getActionButtonClassName = (disabled?: boolean, loading?: boolean) => {
  if (disabled || loading) {
    return 'bg-gray-200';
  }

  return 'bg-blue-400 dark:bg-white text-white dark:text-gray-700 hover:bg-gray-200';
};
export const ActionButton = ({
  children,
  onClick,
  className,
  disabled,
  loading,
}: IActionButton) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        `py-2 rounded-full w-full h-8 cursor-pointer ${getActionButtonClassName(
          disabled,
          loading,
        )} flex justify-center items-center text-center`,
        className,
      )}
      onClick={onClick}
    >
      {loading ? <Spinner size="sm" /> : <div>{children}</div>}
    </button>
  );
};

export const OutlineActionButton = ({
  children,
  onClick,
  className,
  disabled,
  loading,
}: IActionButton) => {
  return (
    <button
      disabled={disabled}
      className={classNames(
        `py-2 rounded-full w-full h-8 cursor-pointer ${
          disabled || loading ? 'bg-gray-200' : 'bg-transparent'
        } text-white dark:text-gray-700  border-blue-500 dark:border-white flex justify-center items-center text-center`,
        className,
      )}
      onClick={onClick}
    >
      {loading ? <Spinner size="sm" /> : <div>{children}</div>}
    </button>
  );
};

const getJoinButtonClassName = (loading: boolean, isJoined: boolean) => {
  if (loading) {
    return 'bg-gray-200';
  }

  if (isJoined) {
    return 'bg-transparent border text-blue-500 dark:text-white border-blue-500 dark:border-white';
  }

  return 'bg-blue-500 dark:bg-white text-white';
};

export const JoinButton = ({
  onClick,
  isJoined,
  className,
  loading,
}: IJoinButton) => {
  return (
    <button
      disabled={loading}
      className={classNames(
        className,
        `h-8 px-6 cursor-pointer rounded-full flex justify-center items-center ${getJoinButtonClassName(
          loading,
          isJoined,
        )}`,
      )}
      onClick={onClick}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <div>{isJoined ? 'Leave' : 'Join'}</div>
      )}
    </button>
  );
};
