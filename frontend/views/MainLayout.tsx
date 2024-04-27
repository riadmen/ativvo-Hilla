
import { useAuth } from 'Frontend/util/auth.js';
import { useRouteMetadata } from 'Frontend/util/routing.js';
import {Suspense, useEffect, useState} from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Avatar,
    Button,
    Box,
    Header,
    IconButton,
    Label,
    LabelGroup,
    Link,
    Octicon,
    PageLayout,
    Text,
    UnderlineNav
} from "@primer/react";
import {
    MarkGithubIcon,
    MortarBoardIcon,
    WorkflowIcon,
    GraphIcon,
    TriangleDownIcon,
    GearIcon,
    CommitIcon,
    ChecklistIcon,
    FileDiffIcon,
    CommentDiscussionIcon,
} from '@primer/octicons-react'
import {DataTable, PageHeader, Table} from "@primer/react/drafts";


const navLinkClasses = ({ isActive }: any) => {
  return `block rounded-m p-s ${isActive ? 'bg-primary-10 text-primary' : 'text-body'}`;
};

function uppercase(input: string | any[]) {
    return input[0].toUpperCase() + input.slice(1)
}

interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    occupation: string;
    role: string;
    important: boolean;
    _links: {
        self: {
            href: string;
        };
        samplePerson: {
            href: string;
        };
    };
}

export default function MainLayout() {
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);

  const { state, logout } = useAuth();
  const profilePictureUrl =
    state.user &&
    `data:image;base64,${btoa(
      state.user.profilePicture.reduce((str, n) => str + String.fromCharCode((n + 256) % 256), ''),
    )}`;

    const now = Date.now()
    const Second = 1000
    const Minute = 60 * Second
    const Hour = 60 * Minute
    const Day = 24 * Hour
    const Week = 7 * Day
    const Month = 4 * Week

    const data = [
        {
            id: 1,
            name: 'codeql-dca-worker',
            type: 'internal',
            updatedAt: now,
            securityFeatures: {
                dependabot: ['alerts', 'security updates'],
                codeScanning: ['report secrets'],
            },
        },
        {
            id: 2,
            name: 'aegir',
            type: 'public',
            updatedAt: now - 5 * Minute,
            securityFeatures: {
                dependabot: ['alerts'],
                codeScanning: ['report secrets'],
            },
        },
        {
            id: 3,
            name: 'strapi',
            type: 'public',
            updatedAt: now - Hour,
            securityFeatures: {
                dependabot: [],
                codeScanning: [],
            },
        },
        {
            id: 4,
            name: 'codeql-ci-nightlies',
            type: 'public',
            updatedAt: now - 6 * Hour,
            securityFeatures: {
                dependabot: ['alerts'],
                codeScanning: [],
            },
        },
        {
            id: 5,
            name: 'dependabot-updates',
            type: 'public',
            updatedAt: now - Day,
            securityFeatures: {
                dependabot: [],
                codeScanning: [],
            },
        },
        {
            id: 6,
            name: 'tsx-create-react-app',
            type: 'public',
            updatedAt: now - Week,
            securityFeatures: {
                dependabot: [],
                codeScanning: [],
            },
        },
        {
            id: 7,
            name: 'bootstrap',
            type: 'public',
            updatedAt: now - Month,
            securityFeatures: {
                dependabot: ['alerts'],
                codeScanning: [],
            },
        },
        {
            id: 8,
            name: 'docker-templates',
            type: 'public',
            updatedAt: now - 3 * Month,
            securityFeatures: {
                dependabot: ['alerts'],
                codeScanning: [],
            },
        },
    ]

  return (
      <Box id={"page layout"}
           className="flex flex-col justify-between h-full p-m"
      >
          <Header>
              <Header.Item>
                  <Header.Link href="#" sx={{fontSize: 2}}>
                      <Octicon icon={MarkGithubIcon} size={32} sx={{mr: 2}}/>
                      <span>GitHub</span>
                  </Header.Link>
              </Header.Item>
              <Header.Item full>Menu</Header.Item>
              <Header.Item sx={{mr: 0}}>
                  <Avatar src="https://github.com/octocat.png" size={20} square alt="@octocat"/>
              </Header.Item>
          </Header>
          <Box
              sx={{
                  padding: 3,
                  bg: 'canvas.default',
              }}
          >
              <PageHeader>
                  <PageHeader.TitleArea>
                      <PageHeader.Title>Title</PageHeader.Title>

                      <PageHeader.Actions>
                          <IconButton aria-label="Workflows" icon={WorkflowIcon}/>
                          <IconButton aria-label="Insights" icon={GraphIcon}/>
                          <Button variant="primary" trailingVisual={TriangleDownIcon}>
                              Add Item
                          </Button>
                          <IconButton aria-label="Settings" icon={GearIcon}/>
                      </PageHeader.Actions>
                  </PageHeader.TitleArea>
                  <PageHeader.Navigation>
                      <UnderlineNav aria-label="Pull Request">
                          <UnderlineNav.Item
                              icon={CommentDiscussionIcon}
                              counter="12"
                              aria-current="page"
                          >
                              Conversation
                          </UnderlineNav.Item>
                          <UnderlineNav.Item counter={3} icon={CommitIcon}>
                              Commits
                          </UnderlineNav.Item>
                          <UnderlineNav.Item counter={7} icon={ChecklistIcon}>
                              Checks
                          </UnderlineNav.Item>
                          <UnderlineNav.Item counter={4} icon={FileDiffIcon}>
                              Files Changes
                          </UnderlineNav.Item>
                      </UnderlineNav>
                  </PageHeader.Navigation>
              </PageHeader>
          </Box>
          <Box
              sx={{
                  bg: 'canvas.default',
                  width: '100%',
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 5,
              }}
          >

              <Table.Container>
                  <Table.Title as="h2" id="repositories">
                      Repositories
                  </Table.Title>
                  <Table.Subtitle as="p" id="repositories-subtitle">
                      A subtitle could appear here to give extra context to the data.
                  </Table.Subtitle>
                  <DataTable
                      aria-labelledby="repositories"
                      aria-describedby="repositories-subtitle"
                      data={data}
                      columns={[
                          {
                              header: 'Repository',
                              field: 'name',
                              rowHeader: true,
                          },
                          {
                              header: 'Type',
                              field: 'type',
                              renderCell: (row) => {
                                  return <Label>{uppercase(row.type)}</Label>
                              },
                          },
                          {
                              header: 'Updated',
                              field: 'updatedAt',
                              renderCell: (row) => {
                                  return <LabelGroup>
                                      {row.securityFeatures.dependabot.map((feature) => {
                                          return <Label key={feature}>{uppercase(feature)}</Label>
                                      })}
                                  </LabelGroup>
                              },
                          },
                          {
                              header: 'Dependabot',
                              field: 'securityFeatures.dependabot',
                              renderCell: (row) => {
                                  return row.securityFeatures.dependabot.length > 0 ? (
                                      <LabelGroup>
                                          {row.securityFeatures.dependabot.map((feature) => {
                                              return <Label key={feature}>{uppercase(feature)}</Label>
                                          })}
                                      </LabelGroup>
                                  ) : null
                              },
                          },
                          {
                              header: 'Code scanning',
                              field: 'securityFeatures.codeScanning',
                              renderCell: (row) => {
                                  return row.securityFeatures.codeScanning.length > 0 ? (
                                      <LabelGroup>
                                          {row.securityFeatures.codeScanning.map((feature) => {
                                              return <Label key={feature}>{uppercase(feature)}</Label>
                                          })}
                                      </LabelGroup>
                                  ) : null
                              },
                          },
                      ]}
                  />
              </Table.Container>
              <Footer/>
          </Box>
      </Box>
  );
}

function Footer() {
    return (
        <Box sx={{textAlign: 'center'}}>
            <Box sx={{mr: 2, display: 'inline-block'}}>
                <Octicon
                    icon={MortarBoardIcon}
                    size={16}
                    sx={{mr: 1, color: 'attention.fg'}}
                />
                <Text sx={{color: 'attention.fg'}}>Tip</Text>
            </Box>
            <Text>
                Before you get started check out our{' '}
                <Link href="https://primer.style/react" target="_blank">
                    Primer React Documentation
                </Link>
            </Text>
        </Box>

    )
}