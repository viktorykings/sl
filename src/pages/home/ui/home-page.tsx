'use client';
import { Modal } from '@/src/shared/ui/modal/';

export function Home() {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <Modal>
          <Modal.Trigger className='border-4 border-purple-500 rounded-md p-4 cursor-pointer'>
            Open Modal
          </Modal.Trigger>
          <Modal.Content>
            {() => (
              <>
                <Modal.Header>
                  <Modal.Title>Modal Title</Modal.Title>
                  <Modal.Description>Modal description here.</Modal.Description>
                </Modal.Header>
                <div className='modal-body'>Custom content</div>
                <Modal.Footer>
                  <Modal.Close>Cancel</Modal.Close>
                </Modal.Footer>
              </>
            )}
          </Modal.Content>
        </Modal>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'></footer>
    </div>
  );
}
