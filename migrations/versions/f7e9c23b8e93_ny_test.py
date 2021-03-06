"""Ny Test

Revision ID: f7e9c23b8e93
Revises: 46a5ee9d7779
Create Date: 2020-08-02 04:41:35.382249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f7e9c23b8e93'
down_revision = '46a5ee9d7779'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('about_me', sa.String(length=140), nullable=True),
    sa.Column('last_seen', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_index(op.f('ix_user_username'), 'user', ['username'], unique=True)
    op.create_table('person',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=64), nullable=True),
    sa.Column('surName', sa.String(length=64), nullable=True),
    sa.Column('gender', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_person_age'), 'person', ['age'], unique=True)
    op.create_index(op.f('ix_person_email'), 'person', ['email'], unique=True)
    op.create_index(op.f('ix_person_firstName'), 'person', ['firstName'], unique=True)
    op.create_index(op.f('ix_person_gender'), 'person', ['gender'], unique=True)
    op.create_index(op.f('ix_person_surName'), 'person', ['surName'], unique=True)
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(length=140), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_project_timestamp'), 'project', ['timestamp'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_project_timestamp'), table_name='project')
    op.drop_table('project')
    op.drop_index(op.f('ix_person_surName'), table_name='person')
    op.drop_index(op.f('ix_person_gender'), table_name='person')
    op.drop_index(op.f('ix_person_firstName'), table_name='person')
    op.drop_index(op.f('ix_person_email'), table_name='person')
    op.drop_index(op.f('ix_person_age'), table_name='person')
    op.drop_table('person')
    op.drop_index(op.f('ix_user_username'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    # ### end Alembic commands ###
