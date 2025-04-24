import {
  useSession,
  signIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react';
import * as api from '@/app/lib/api/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { routes } from '@/config/routes';
import { MdToken } from 'react-icons/md';



