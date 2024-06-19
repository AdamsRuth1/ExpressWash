"""Add country_name to institutions

Revision ID: 5c62cf176efa
Revises: 
Create Date: 2024-06-15 15:46:56.918917

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5c62cf176efa'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('institutions', sa.Column('country_name', sa.String(), nullable=True))
    op.drop_index('ix_institutions_country_code', table_name='institutions')
    op.create_index(op.f('ix_institutions_country_name'), 'institutions', ['country_name'], unique=False)
    op.drop_column('institutions', 'country_code')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('institutions', sa.Column('country_code', sa.VARCHAR(), nullable=True))
    op.drop_index(op.f('ix_institutions_country_name'), table_name='institutions')
    op.create_index('ix_institutions_country_code', 'institutions', ['country_code'], unique=False)
    op.drop_column('institutions', 'country_name')
    # ### end Alembic commands ###