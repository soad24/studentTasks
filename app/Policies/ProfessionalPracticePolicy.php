<?php

namespace App\Policies;

use App\Models\ProfessionalPractice;
use App\Models\User;

class ProfessionalPracticePolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ProfessionalPractice $practice): bool
    {
        return $user->id === $practice->user_id || 
               $user->isReviewer() || 
               $user->isApprover() || 
               $user->isCertifier() || 
               $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ProfessionalPractice $practice): bool
    {
        return $user->id === $practice->user_id && $practice->status === 'pending';
    }

    /**
     * Determine whether the user can review the model.
     */
    public function review(User $user, ProfessionalPractice $practice): bool
    {
        return $user->isReviewer() && $practice->status === 'pending';
    }

    /**
     * Determine whether the user can approve the model.
     */
    public function approve(User $user, ProfessionalPractice $practice): bool
    {
        return $user->isApprover() && $practice->status === 'under_review';
    }

    /**
     * Determine whether the user can certify the model.
     */
    public function certify(User $user, ProfessionalPractice $practice): bool
    {
        return $user->isCertifier() && $practice->status === 'approved';
    }
}